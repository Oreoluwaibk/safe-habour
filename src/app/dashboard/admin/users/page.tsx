"use client"
import AdminTable from '@/components/admin/AdminTable'
import AdminContainer from '@/components/dashboard/AdminContainer'
import { Icon } from '@iconify/react'
import { App, Card, Dropdown, Input, List, Segmented } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { ColumnsType, TableProps } from 'antd/es/table';
import { IAdminUserList } from '../../../../../utils/interface'
import UserDetails from '@/components/admin/modals/UserDetails'
import SuspendModal from '@/components/admin/modals/SuspendModal'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import { getUsers, IAdminParams } from '@/redux/action/admin'
import Status from '@/components/general/Status'
import useDebounce from '@/hooks/useDebounce'
import moment from 'moment'
import { StarFilled } from '@ant-design/icons'

const Page = () => {
  const { modal } = App.useApp();
  const [ active, setActive ] = useState("Clients");
  const [ data, setData ] = useState<TableProps<IAdminUserList>["dataSource"]>([]);
  const [ openModal, setOpenModal ] = useState(false);
  const [ openSuspend, setOpenSuspend ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState<IAdminUserList | null>();
  const [ loading, setLoading ] = useState(false);
  const [ filters, setFilter ] = useState<IAdminParams>({
    pageNumber: 1,
    pageSize: 10,
    UserType: "ClientUser",
    searchTerm: ""
  });
  const [ total, setTotal ] = useState(0);
  const [ search, setSearch ] = useState("");
  const debounceSearch = useDebounce(search, 500)
  

  const handleGetUsers = useCallback(() => {
    setLoading(true);
    getUsers(
      filters.pageNumber,
      filters.pageSize,
      filters.UserType!,
      filters.searchTerm
    )
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setData(res.data.data.list);
        setTotal(res.data.data.totalItems);
      }
    })
    .catch(err => {
      modal.error({
        title: `Unable to get ${active} user`,
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal, filters, active]);
  
  useEffect(() => {
    handleGetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  useEffect(() => {
    setFilter((prev) => ({...prev, searchTerm: debounceSearch as string}))
  }, [debounceSearch])

  const handleChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      UserType: value === "Clients" ? "ClientUser" : "ServiceWorker"
    }))
    setActive(value);
  }

  const dropdownItem = [
    {
      key: '1',
      label: (
        <p onClick={() => setOpenModal(true)} className='text-[#1f1f1f] text-sm font-semibold'>View Details</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => setOpenSuspend(true)} className='text-[#1f1f1f] text-sm font-semibold'>Suspend User</p>
      ),
    },
  ];

  const dropdownItem2 = [
    {
      key: '1',
      label: (
        <p onClick={() => setOpenModal(true)} className='text-[#1f1f1f] text-sm font-semibold'>View Details</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => setOpenSuspend(true)} className='text-[#1f1f1f] text-sm font-semibold'>Unsuspend User</p>
      ),
    },
  ];

  const column: ColumnsType = [
    {
      key: "1",
      title: "Name",
      dataIndex: "fullName",
    },
    {
      key: "2",
      title: "Phone",
      dataIndex: "phoneNumber",
      hidden: active === "Workers"
    },
    {
      key: "2",
      title: "Service",
      dataIndex: "servicesOffered",
      hidden: active === "Clients",
      render(value) {
        return (
        <List 
          dataSource={value} 
          renderItem={(item: string) => (
            <List.Item style={{margin: 0, padding: 0}}>
             {item}
            </List.Item>
          )}
          size="small"
        />
      )
      }
    },
    {
      key: "3",
      title: "Joined Date",
      dataIndex: "dateJoined",
      render(value) {
        return <span>{moment(value).format("YYYY-MM-DD")}</span>
      }
    },
    {
      key: "4",
      title: "Ratings",
      dataIndex: "averageRating",
      hidden: active === "Clients",
      render(value) {
        return <span>{<StarFilled className='text-[#FED500]!' />} {value && Number(value).toFixed(1) || 0.0}</span>
      }
    },
    {
      key: "5",
      title: "Job Completed",
      dataIndex: "completedJobsCount",
      hidden: active === "Clients"
    },
    {
      key: "6",
      title: "Status",
      dataIndex: "isActive",
      render(value) {
        return (
          <Status title={value ? "Active" : "Not Active"} bg='#FFF3F5' color='#670316' />
        )
      },
    },
    {
      key: "7",
      title: "Action",
      dataIndex: "duration",
      render(value, record) {
        return (
          <Dropdown
            menu={{ items: record.isActive ? dropdownItem : dropdownItem2, onClick: () => setSelectedUser(record as IAdminUserList) }} 
            trigger={["click"]}
          >
            <Icon icon="iwwa:option" />
          </Dropdown>
        )
      },
    },
  ]

  const handlePageChange = (pageNumber: number) => {
    setFilter((prev) => ({...prev, pageNumber}))
  }
  
  return (
    <AdminContainer active='Users'>
    <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
      <div>
        <h1 className='t-pri !font-semibold text-[32px]'>User Management</h1>
        <p className='t-pri mb-6'>Manage all clients and workers on the platform</p>
      </div>

      <div  className='mb-6'>
        <Segmented 
          options={["Clients", "Workers"]}
          defaultValue={active}
          onChange={(value) => handleChange(value)}
          value={active}
        />
      </div>

      <Card 
        title={<p className='text-[#1e1e1e] font-semibold text-lg'>All {active}</p>}
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
        handlePageChange={handlePageChange}
        loading={loading}
        total={total}
        filter={{
          pageNumber: filters.pageNumber!,
          pageSize: filters.pageSize!
        }}
      />
      </Card>
    </Card>

    {openModal && selectedUser && <UserDetails open={openModal} onCancel={() => setOpenModal(false)} user={selectedUser!} isWorker={active === "Workers"} />}
    {openSuspend && selectedUser && <SuspendModal refresh={handleGetUsers} open={openSuspend} onCancel={() => setOpenSuspend(false)} user={selectedUser!}  />}

    </AdminContainer>
  )
}

export default Page