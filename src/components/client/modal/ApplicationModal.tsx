import { App, Col, Modal, Row, Segmented, SegmentedProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { IClientApplicationDetails, IJobApplication, JobDetails } from '../../../../utils/interface';
import { acceptJobApplication, getSingleJobApplication } from '@/redux/action/jobs';
import { createErrorMessage } from '../../../../utils/errorInstance';
import JobModalCard from '../cards/JobModalCard';

interface props {
    open: boolean;
    onCancel: () => void;
    jobDetails:JobDetails;
}
const ApplicationModal = ({
    open,
    onCancel,
    jobDetails
}: props) => {
    const [ active, setActive ] = useState<SegmentedProps["value"]>(1);
    const [ applications, setApplications ] = useState<IClientApplicationDetails[]>([]);
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ stat, setStat ] = useState({
        all: 0,
        pending: 0,
        accepted: 0,
        rejected: 0
    });

    const [ filters, setFilters ] = useState<{
        status?: number;
        pageNumber?: number;
    }>({
        status: undefined,
        pageNumber: 1
    });

    const handleGetAllJobs = useCallback((id: string) => {
        setLoading(true);
        getSingleJobApplication(id)
        .then(res => {
            if(res.status === 200 || res.status ===201) {
                const newList = res.data.data.list || [];
                setApplications(newList);
                setStat({
                    all: newList.length,
                    pending: 0,
                    accepted: 0,
                    rejected: 0
                });
                setLoading(false);
            }})
    
        .catch(err => {
            modal.error({
                title: "Unable to get applications",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })

    }, []);

    const handleGetJobsByStatus = useCallback((id: string, pageNumber: number = 1, status: number| undefined) => {
        setLoading(true);
        getSingleJobApplication(id, pageNumber, status)
        .then(res => {
            if(res.status === 200 || res.status ===201) {
                setApplications(res.data.data.list || []);
                if(status === 1) {
                    setStat(prev => ({
                        ...prev,
                        pending: res.data.data.totalItems || 0
                    }));
                } else if(status === 2) {
                    setStat(prev => ({
                        ...prev,
                        accepted: res.data.data.totalItems || 0
                    }));
                } else if(status === 3) {
                    setStat(prev => ({
                        ...prev,    
                        rejected: res.data.data.totalItems || 0
                    }));
                }
                setLoading(false);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get applications",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })          
    }, []);

    const handleChange = (value: SegmentedProps["value"]) => {
        setActive(value);
        if(value === 1) {
            setFilters({
                status: undefined,
                pageNumber: 1
            });
            handleGetAllJobs(jobDetails.id.toString());
            return;
        }
        handleGetJobsByStatus(jobDetails.id.toString(), filters.pageNumber, Number(value)-1);
    }

    useEffect(() => {
        handleGetAllJobs(jobDetails.id.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const segmentedItem: SegmentedProps["options"] = [
        {label: `All (${applications.length || stat.all})`, value: 1},
        {label: `Pending (${stat.pending})`, value: 2},
        {label: `Accepted (${stat.accepted})`, value: 3},
        {label: `Rejected (${stat.rejected})`, value: 4}
    ]
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        title={jobDetails.jobTitle}
        footer={null}
        width={800}
        loading={loading}
    >
        <div  className='my-6'>
            <Segmented 
                options={segmentedItem}
                defaultValue={active}
                value={active}
                onChange={(value) => handleChange(value)}
            />
        </div>

        <Row gutter={[15, 15]}>
            {applications.length === 0 && (
                <Col lg={24} sm={24} xs={24} className='text-center py-10 text-[#121212]'>
                    <p className='text-[#808080]'>No applications found.</p>
                </Col>
            )}
            {applications.map((application) => (
                <Col lg={24} sm={24} xs={24} key={application.id}>
                    <JobModalCard onRefresh={() => handleGetJobsByStatus(jobDetails.id.toString(), 1, filters.status)} application={application}/>
                </Col>
            ))}
        </Row>
    </Modal>
  )
}

export default ApplicationModal