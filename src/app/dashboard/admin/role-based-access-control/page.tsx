"use client"
import AdminTable from '@/components/admin/AdminTable'
import UserDetails from '@/components/admin/modals/UserDetails'
import AdminContainer from '@/components/dashboard/AdminContainer'
import RoundBtn from '@/components/general/RoundBtn'
import { Icon } from '@iconify/react'
import { App, Card, Dropdown, Input, Segmented, TableProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useEffect, useState } from 'react'
import { IAdminUserList } from '../../../../../utils/interface'
import useDebounce from '@/hooks/useDebounce'
import { getAdminUsers, IAdminParams } from '@/redux/action/admin'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import Status from '@/components/general/Status'
import AddAdminUser from '@/components/admin/modals/AddAdminUser'
import DeleteUser from '@/components/admin/modals/DeleteUser'

const Page = () => {
   const { modal } = App.useApp();
  const [ data, setData ] = useState<TableProps["dataSource"]>([]);
  const [ active, setActive ] = useState("Admin Users");
  const [ openModal, setOpenModal ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ openAdd, setOpenAdd ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState<IAdminUserList|null>(null);
  const [ total, setTotal ] = useState(0);
  const [ search, setSearch ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ filters, setFilter ] = useState<IAdminParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ""
  });
  const debounceSearch = useDebounce(search, 500)

  const handleGetUsers = useCallback(() => {
    setLoading(true);
    getAdminUsers(
      filters.pageNumber,
      filters.pageSize,
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
  }, [filters]);

  useEffect(() => {
    setFilter((prev) => ({...prev, searchTerm: debounceSearch as string}))
  }, [debounceSearch]);

  const dropdownItem = [
    {
      key: '1',
      label: (
        <p onClick={() => {
          setIsEdit(true)
          setOpenAdd(true)
        }} className='text-[#1f1f1f] text-sm font-semibold'>Edit User</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => setOpenDelete(true)} className='text-[#1f1f1f] text-sm font-semibold'>Delete User</p>
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
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "3",
      title: "Role",
      dataIndex: "roles",
      render(value) {
        return <Status title={value[0]} />
      }
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "isActive",
      render(value) {
        return (
          <Status title={value ? "Active" : "Not Active"} bg='#FFF3F5' color='#670316' />
        )
      },
    },
     {
      key: "5",
      title: "Last Login",
      dataIndex: "price"
    },
    {
      key: "6",
      title: "Action",
      dataIndex: "ratings",
      render(value, record) {
        return (
          <Dropdown
            menu={{ items: dropdownItem,onClick: () => setSelectedUser(record as IAdminUserList) }} 
            trigger={["click"]}
          >
            <Icon icon="iwwa:option" />
          </Dropdown>
        )
      },
    },
    
  ]
  const handleChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      UserType: value === "Admin Users" ? "ClientUser" : "ServiceWorker"
    }))
    setActive(value);
  }

  const handlePageChange = (pageNumber: number) => {
    setFilter((prev) => ({...prev, pageNumber}))
  }
  
  return (
  <AdminContainer active='Role Based Access Control'>
  <Card 
    classNames={{ body: "bg-[#f6f6f6]!", header: "bg-[#f6f6f6]!"}}
    title={
      <div>
        <h1 className='t-pri !font-semibold text-[32px]'>Role-Based Access Control</h1>
        <p className='t-pri mb-6'>Manage admin users and permissions</p>
      </div>
    }
    extra={<RoundBtn 
      title='Add Admin User' 
      icon={<Icon icon="material-symbols:add-rounded" fontSize={18} />} 
      primary
      width={167}
      onClick={() => {
        setSelectedUser(null);
        setIsEdit(false);
        setOpenAdd(true)
      }}
    />}
  >
    <div  className='mb-6'>
      <Segmented 
        options={["Admin Users", "Role Permissions"]}
        defaultValue={active}
        onChange={(value) => handleChange(value)}
        value={active}
      />
    </div>

    <Card 
      title={<p className='text-[#1e1e1e] font-semibold text-lg'>Admin Users</p>}
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

  {openModal && <UserDetails open={openModal} onCancel={() => setOpenModal(false)} user={selectedUser!}/>}
    {openAdd && <AddAdminUser isEdit={isEdit} onCancel={() => setOpenAdd(false)} open={openAdd} refresh={handleGetUsers} user={selectedUser!} />}
    {openDelete && <DeleteUser refresh={handleGetUsers} open={openDelete} onCancel={() => setOpenDelete(false)} user={selectedUser!}  />}
  </AdminContainer>
  )
}

export default Page