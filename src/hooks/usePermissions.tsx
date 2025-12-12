"use client"
import { useEffect, useState } from 'react';
import { IAdminPermissions } from '../../utils/interface';
import { getAdminPermissions } from '@/redux/action/admin';

interface AuthenticationState {
  permissions: IAdminPermissions[];
  loading: boolean;
  error: string | null;
  handleGetPermissions: () => void;
  handleShowPermission: (ids: string[]) => string[];
}

export const usePermissions = (): AuthenticationState => {
  const [ permissions, setPermissions ] = useState<IAdminPermissions[]>([
  { 
    "id": "c1c2c3c4-c5c6-c7c8-c9c0-cacbcccdcecf",
    "key": "analytics.manage",
    "group": "Analytics",
    "description": "View analytics",
    "createdAt": "2025-12-10T15:50:18.685386"
  },
  {
    "id": "f1f2f3f4-f5f6-f7f8-f9f0-fafbfcfdfeff",
    "key": "auditlogs.manage",
    "group": "Audit Logs",
    "description": "View audit logs",
    "createdAt": "2025-12-10T15:50:19.951613"
  },
  {
    "id": "f4e4d4c4-b4a4-934d-b2a2-91c1d1e1f1a1",
    "key": "financial.manage",
    "group": "Financial",
    "description": "View financial metrics",
    "createdAt": "2025-12-10T15:50:18.438364"
  },
  {
    "id": "9f2fd998-f9f5-4c7c-8f2a-95dfd3d2d4d5",
    "key": "jobs.manage",
    "group": "Jobs",
    "description": "Manage jobs",
    "createdAt": "2025-12-10T15:50:17.179879"
  },
  {
    "id": "5e6d77c7-3f2b-4ad2-a2d9-ef74b4d3b7e2",
    "key": "kyc.manage",
    "group": "KYC",
    "description": "Manage KYC verifications",
    "createdAt": "2025-12-10T15:50:16.862395"
  },
  {
    "id": "a7b9d3d2-74a8-4c6f-9c1a-0a0b0c0d0e0f",
    "key": "rbac.manage",
    "group": "RBAC",
    "description": "Manage roles and permissions",
    "createdAt": "2025-12-10T15:50:17.461707"
  },
  {
    "id": "d1d2d3d4-d5d6-d7d8-d9d0-dadbdcdddedf",
    "key": "transactions.manage",
    "group": "Transactions",
    "description": "View transaction data",
    "createdAt": "2025-12-10T15:50:19.32937"
  },
  {
    "id": "b4e7a1c5-5f9c-4f13-9f12-0f540c3b6a01",
    "key": "users.manage",
    "group": "Users",
    "description": "Manage users",
    "createdAt": "2025-12-10T15:50:16.539008"
  },
  {
    "id": "e1e2e3e4-e5e6-e7e8-e9e0-eaecebeeefff",
    "key": "workeravailability.manage",
    "group": "Worker Availability",
    "description": "Manage worker availability",
    "createdAt": "2025-12-10T15:50:19.625093"
  }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGetPermissions = () => {
    setLoading(true);
    getAdminPermissions()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setPermissions(res.data.data);
      }
    })
    .catch(err => {
      setLoading(false);
      setError(err?.response ? err?.response.data : err?.message);
    })
  }

  const handleShowPermission = (ids: string[]) => {
    return permissions
    .filter(p => ids.includes(p.id))
    .map(p => p.key);
  }

  return { permissions, loading, error, handleGetPermissions, handleShowPermission };
};
