"use client"
import AdminTable from '@/components/admin/AdminTable'
import AdminContainer from '@/components/dashboard/AdminContainer'
import { Icon } from '@iconify/react'
import { App, Card, Dropdown, Input, Segmented, SegmentedProps } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { ColumnsType, TableProps } from 'antd/es/table';
import CancelJob from '@/components/admin/modals/CancelJob'
import { IAdminJobDetails } from '../../../../../utils/interface'
import { CloseOutlined } from '@ant-design/icons'
import JobDetailsModal from '@/components/admin/modals/JobDetailsModal'
import { completeASuperadminJob, getSuperAdminJobs, IAdminParams } from '@/redux/action/admin'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import moment from 'moment'
import useApplicationStatus from '@/hooks/useApplicationStatus'
import Status from '@/components/general/Status'
import useDebounce from '@/hooks/useDebounce'

const title = ["All", "Pending", "Accepted",  "Completed", "Cancelled"]
const Page = () => {
  const [ active, setActive ] = useState<any>(0);
  const [ data, setData ] = useState<TableProps<IAdminJobDetails>["dataSource"]>([]);
  const [ openCancel, setOpenCancel ] = useState(false);
  const [ selectedJob, setSelectedJob ] = useState<IAdminJobDetails>({
    "jobId": "",
    "jobTitle": "",
    "clientName": "",
    "workerName": "",
    "date": "",
    "amount": 0,
    "durationInHours": null,
    "status": 1
  });
  const { handleReturnStatus } = useApplicationStatus(1, "job")
  const [ openDetails, setOpenDetails ] = useState(false);
  const { modal, message } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  const [ filters, setFilters ] = useState<IAdminParams>({
    pageNumber: 1, 
    pageSize:10, 
    searchTerm: "", 
    Status: 0,
    CreatedFrom: "",
    CreatedTo: "",
    NeededFrom: "",
    NeededTo: ""
  });
  const [ total, setTotal ] = useState(0);
  const [ counts, setCounts ] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    completed: 0,
    cancelled: 0
  })
  const [ search, setSearch ] = useState("");
  const [ markLoading, setMarkLoading ] = useState(false);
  const debounceSearch = useDebounce(search, 500)

  const handleGetJobs = useCallback(() => {
    setLoading(true);
    getSuperAdminJobs(
      filters.pageNumber,
      filters.pageSize,
      filters.searchTerm,
      filters.Status
    )
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setData(res.data.data.jobs.list);
        setCounts(res.data.data.counts);
        setTotal(res.data.data.jobs.totalItems);
      }
    })
    .catch(err => {
      modal.error({
        title: `Unable to get job list`,
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal, filters]);
    
  useEffect(() => {
    handleGetJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    setFilters((prev) => ({...prev, searchTerm: debounceSearch as string}))
  }, [debounceSearch])

  const handleChange = (value: number) => {
    setFilters((prev) => ({...prev, Status: value}))
    setActive(value);
  }

  const handleMArkComplete = () => {
    if(!selectedJob) return message.warning("Select a job to mark as completed");
    setMarkLoading(true);
    completeASuperadminJob(selectedJob.jobId)
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        modal.success({
          title: <div className='flex flex-col items-center justify-center gap-6'>
            <span style={{backgroundColor: "#D1FADF"}} className='flex items-center justify-center w-12 h-12 rounded-full'>
              <Icon fontSize={20} icon={"mdi:checkbox-marked-circle-outline"} color="#039855" />
            </span>
            
            <p className='text-[#101828] text-lg font-medium text-center'>{res.data.message || "You have successfully mark this job as complete"}</p>
          </div>,
          icon: null,
          footer: null,
          closable: true,
          closeIcon: <CloseOutlined />,
        })
        handleGetJobs();
      }
    })
    .catch(err => {
      modal.error({
        title: `Unable to get mark ${selectedJob.jobTitle} as completed!`,
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
      setLoading(false);
    })
  }

  const handlePageChange = (pageNumber: number) => {
    setFilters((prev) => ({...prev, pageNumber}))
  }

  const dropdownItem = [
    {
      key: '1',
      label: (
        <p onClick={() => setOpenDetails(true)} className='text-[#1f1f1f] text-sm font-semibold'>View Details</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={handleMArkComplete} className='text-[#1f1f1f] text-sm font-semibold'>Mark Complete</p>
      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => setOpenCancel(true)} className='text-[#1f1f1f] text-sm font-semibold'>Cancel Job</p>
      ),
    },
  ];

  const column: ColumnsType = [
    {
      key: "1",
      title: "Job Title",
      dataIndex: "jobTitle",
    },
    {
      key: "2",
      title: "Clients",
      dataIndex: "clientName",
    },
    {
      key: "3",
      title: "Workers",
      dataIndex: "workerName"
    },
    {
      key: "4",
      title: "Date",
      dataIndex: "date",
      render(value) {
        return (
          <span>{moment(value).format("YYYY-MM-DD")}</span>
        )
      },
    },
    {
      key: "5",
      title: "Duration",
      dataIndex: "durationInHours",
      render(value){
        return <span>{value || "N/A"}</span>
      }
    },
    {
      key: "6",
      title: "Amount",
      dataIndex: "amount",
      render(value) {
        return <span>CAD {Number(value).toFixed(2)}</span>
      },
    },
    {
      key: "7",
      title: "Status",
      dataIndex: "status",
      render(value) {
        return <Status title={handleReturnStatus(value).title} bg={handleReturnStatus(value).bg} color={handleReturnStatus(value).color} />
      }
    },
    {
      key: "8",
      title: "Action",
      dataIndex: "duration",
      render(value, record) {
        return (
          <Dropdown
            menu={{ items: dropdownItem, onClick: () => setSelectedJob(record as IAdminJobDetails) }}
            trigger={["click"]} 
          >
            <Icon icon="iwwa:option" />
          </Dropdown>
        )
      },
    },
  ]

  const segmentedItem: SegmentedProps["options"] = [
    {label: `All Jobs (${counts.total})`, value: 0},
    {label: `Pending (${counts.pending})`, value: 1},
    {label: `Accepted (${counts.accepted})`, value: 2},
    {label: `Completed (${counts.completed})`, value: 3},
    {label: `Cancelled (${counts.cancelled})`, value: 4},
  ]
  return (
    <AdminContainer active='Job & Bookings'>
    <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
      <div>
        <h1 className='t-pri !font-semibold text-[32px]'>Jobs & Bookings</h1>
        <p className='t-pri mb-6'>Monitor and manage all platform bookings</p>
      </div>

      <div  className='mb-6'>
        <Segmented 
          options={segmentedItem}
          defaultValue={active}
          onChange={(value) => handleChange(value)}
          value={active}
        />
      </div>

      <Card 
        title={<p className='text-[#1e1e1e] font-semibold text-lg'>{title[active]} Jobs</p>}
        extra={<Input 
          prefix={<Icon icon="ic:round-search" />} 
          placeholder='Search...' 
          className='mt-2'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{backgroundColor: "#F4F4F4", height: 36, width: 146}} 
        />}
        classNames={{ body: "p-0!"}}
        
      >
      <AdminTable 
        title=""
        data={data}
        column={column}
        total={total}
        filter={{
          pageNumber: filters.pageNumber!,
          pageSize: filters.pageSize!
        }}
        handlePageChange={handlePageChange}
        loading={loading}
      />
      </Card>
    </Card>
    {openCancel && selectedJob && <CancelJob refresh={handleGetJobs} open={openCancel} onCancel={() => setOpenCancel(false)} job={selectedJob!} />}
    {openDetails && selectedJob && <JobDetailsModal refresh={handleGetJobs} open={openDetails} onCancel={() => setOpenDetails(false)} job={selectedJob!} />}

    </AdminContainer>
  )
}

export default Page