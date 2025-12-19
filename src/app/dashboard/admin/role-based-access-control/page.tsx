"use client"
import AdminTable from '@/components/admin/AdminTable'
import UserDetails from '@/components/admin/modals/UserDetails'
import AdminContainer from '@/components/dashboard/AdminContainer'
import RoundBtn from '@/components/general/RoundBtn'
import { Icon } from '@iconify/react'
import { App, Card, Dropdown, Input, List, Segmented, TableProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useEffect, useState } from 'react'
import { IAdminUserList } from '../../../../../utils/interface'
import useDebounce from '@/hooks/useDebounce'
import { getAdminRoles, getAdminUsers, IAdminParams, IRoles } from '@/redux/action/admin'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import Status from '@/components/general/Status'
import AddAdminUser from '@/components/admin/modals/AddAdminUser'
import DeleteUser from '@/components/admin/modals/DeleteUser'
import { usePermissions } from '@/hooks/usePermissions'
import moment from 'moment'
import CreateRole from '@/components/admin/modals/CreateRole'

const Page = () => {
  const { modal } = App.useApp();
  const [ data, setData ] = useState<TableProps["dataSource"]>([]);
  const [roles, setRoles ] = useState<IRoles[]>([]);
  const { permissions, handleShowPermission } = usePermissions();
  const [ active, setActive ] = useState("Admin Users");
  const [ openModal, setOpenModal ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ openAdd, setOpenAdd ] = useState(false);
  const [ openCreate, setOpenCreate ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ type, setType ] = useState<"create" | "edit" | "view" | "delete">("create")
  const [ selectedUser, setSelectedUser ] = useState<IAdminUserList|null>(null);
  const [ selectedRole, setSelectedRole ] = useState<IRoles|null>(null);
  const [ total, setTotal ] = useState(0);
  const [ search, setSearch ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ filters, setFilter ] = useState<IAdminParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ""
  });
  const [ isEnable, setIsEnable ] = useState(false);
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

  const handleGetAdminRoles = useCallback(() => {
    setLoading(true);
    getAdminRoles(filters.searchTerm)
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setData(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get admin roles",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal, filters.searchTerm]);

  const handleGetRoles = useCallback(() => {
    setLoading(true);
    getAdminRoles()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setRoles(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get admin roles",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);
    
  useEffect(() => {
    if(active === "Admin Users") handleGetUsers();
    else handleGetAdminRoles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, active]);

  useEffect(() => {
    handleGetRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <p onClick={() => {
          setIsEnable(false);
          setOpenDelete(true);
        }} className='text-[#1f1f1f] text-sm font-semibold'>Disable User</p>
      ),
    },
  ];

  const dropdownItem10 = [
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
        <p onClick={() => {
          setIsEnable(true);
          setOpenDelete(true);
        }} className='text-[#1f1f1f] text-sm font-semibold'>Enable User</p>
      ),
    },
  ];

  const dropdownItem2 = [
    {
      key: '1',
      label: (
        <p onClick={() => {
          setType("view")
          setOpenCreate(true)
        }} className='text-[#1f1f1f] text-sm font-semibold'>View Admin User</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => {
          setType("edit")
          setOpenCreate(true)
        }} className='text-[#1f1f1f] text-sm font-semibold'>Edit Admin User</p>
      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => {
          setType("delete")
          setOpenCreate(true)
        }} className='text-[#1f1f1f] text-sm font-semibold'>Diable Admin User</p>
      ),
    },
  ];

  const dropdownItem20 = [
    {
      key: '1',
      label: (
        <p onClick={() => {
          setType("view")
          setOpenCreate(true)
        }} className='text-[#1f1f1f] text-sm font-semibold'>View Admin User</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => {
          setType("edit")
          setOpenCreate(true)
        }} className='text-[#1f1f1f] text-sm font-semibold'>Edit Admin User</p>
      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => {
          setType("edit")
          setOpenCreate(true)
        }} className='text-[#1f1f1f] text-sm font-semibold'>Enable Admin User</p>
      ),
    },
  ];

  const column: ColumnsType = [
    {
      key: "1",
      title: "Name",
      dataIndex: "fullName",
      hidden: active === "Role Permissions"
    },
    {
      key: "2",
      title: "Role Name",
      dataIndex: "name",
      hidden: active !== "Role Permissions",
      render(value) {
        return <Status 
          title={value} 
          color={value === "SuperAdmin" ?"#039855" : value === "Support" ?  "#2860D8" : "#343434"} 
          bg={value === "SuperAdmin" ? '#EAFFF5' : value === "Support" ? "#F4F7FF" : "#F4F4F4"} />
      },
    },
    {
      key: "2",
      title: "Email",
      dataIndex: "email",
      hidden: active === "Role Permissions"
    },
    {
      key: "3",
      title: "Role",
      dataIndex: "roles",
      render(value) {
      return <Status 
          title={value[0]} 
          color={value[0] === "SuperAdmin" ?"#039855" : value[0] === "Support" ?  "#2860D8" : "#343434"} 
          bg={value[0] === "SuperAdmin" ? '#EAFFF5' : value[0] === "Support" ? "#F4F7FF" : "#F4F4F4"} 
        />
      },
      hidden: active === "Role Permissions"
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "isActive",
      render(value) {
        return (
          <Status 
            title={value ? "Active" : "Not Active"} 
            bg={value ? '#FFF3F5' : "#F7F7F7"} 
            color={value ? '#670316': "#3E3E3E"} />
        )
      }
    },
    {
      key: "5",
      title: "Last Login",
      dataIndex: "price",
      hidden: active === "Role Permissions"
    },
    {
      key: "7",
      title: "Description",
      dataIndex: "description",
      hidden: active !== "Role Permissions",
      render(value) {
        return <span className=''>{value.substr(0,20)}...</span>
      }
    },
    {
      key: "8",
      title: "Permission",
      dataIndex: "permissionIds",
      hidden: active !== "Role Permissions",
      render(value) {
        return (
        <List 
          dataSource={handleShowPermission(value) as string[]}
          renderItem={(item, i) => (
            <List.Item key={i} style={{padding: 0, margin: "3px 0"}}>
              <Status title={item} color='#3E3E3E' bg='#F7F7F7' />
            </List.Item>
          )}
          itemLayout="horizontal"
        />
        )
      }
    },
    {
      key: "9",
      title: "Created On",
      dataIndex: "createdAt",
      hidden: active !== "Role Permissions",
      render(value) {
        return <span>{moment(value).format("YYYY-MM-DD")}</span>
      }
    },
    {
      key: "6",
      title: "Action",
      dataIndex: "ratings",
      render(value, record) {
        return (
          <Dropdown
            menu={{ 
              items: active === "Admin Users" ? (record.isActive ? dropdownItem : dropdownItem10) : (record.isActive ? dropdownItem2 : dropdownItem20),
              onClick: () =>{ 
                if(active === "Admin Users") setSelectedUser(record as IAdminUserList)
                  else setSelectedRole(record as IRoles) 
              }
            }} 
            trigger={["click"]}
          >
            <Icon icon="iwwa:option" />
          </Dropdown>
        )
      },
    },
    
  ]

  const handleChange = (value: string) => {
    setData([]);
    if(value === "Admin Users") handleGetUsers();
      else handleGetAdminRoles();
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
      title={active === "Admin Users" ? 'Add Admin User' : "Create Role"} 
      icon={<Icon icon="material-symbols:add-rounded" fontSize={18} />} 
      primary
      width={167}
      onClick={() => {
        if(active === "Admin Users"){
          setSelectedUser(null);
          setIsEdit(false);
          setOpenAdd(true)
        }else {
          setSelectedRole(null);
          setType("create");
          setOpenCreate(true)
        }
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

  {openModal && 
    <UserDetails 
      open={openModal} 
      onCancel={() => setOpenModal(false)} 
      user={selectedUser!}
    />}
  {openAdd &&   
    <AddAdminUser 
      roles={roles} 
      isEdit={isEdit} 
      onCancel={() => setOpenAdd(false)} 
      open={openAdd} 
      refresh={handleGetUsers} 
      user={selectedUser!} 
    />}
  {openCreate && 
    <CreateRole 
      permissions={permissions} 
      type={type} 
      onCancel={() => setOpenCreate(false)} 
      open={openCreate} 
      refresh={handleGetAdminRoles} 
      user={selectedRole!} 
    />}
  {openDelete && 
    <DeleteUser 
      refresh={handleGetUsers} 
      open={openDelete} 
      onCancel={() => setOpenDelete(false)} 
      user={selectedUser!}
      isEnable={isEnable}
    />}
  </AdminContainer>
  )
}

export default Page