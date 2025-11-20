import React, { useEffect, useState, useTransition  } from "react";
import { Select, Spin } from "antd";
// import { useRouter } from "next/router";
import { getAllJobs } from "@/redux/action/jobs";
import { useRouter } from "next/navigation";
import { CloseCircleFilled, LoadingOutlined, SearchOutlined } from "@ant-design/icons";

interface props {
    width: number;
}
const WorkerSearch: React.FC<props> = ({ width }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<any[]>([]);

    // 🔄 Debounce (500ms)
    useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedValue(searchValue);
    }, 500);

    return () => clearTimeout(timer);
    }, [searchValue]);

    // 🔍 Fetch only when user searches
    useEffect(() => {
    const fetch = async () => {
        if (!debouncedValue || debouncedValue.trim() === "") {
        setOptions([]);
        return;
        }

        setLoading(true);
        try {
        const res = await getAllJobs(1, 20, debouncedValue);
        const result = res.data.data.list;
        console.log("result", result)

        const formatted = result.map((item: any) => ({
            label: item.name || `${item.jobTitle} (${item.location || "No specified location"})` || "Untitled",
            value: item.id,
        }));

        setOptions(formatted);
        } finally {
        setLoading(false);
        }
    };

    fetch();
    }, [debouncedValue]);

    const handleSelect = (id: string) => {
        startTransition(() => {
            router.push(`/dashboard/worker/jobs/${id}`);
        });
    };

    const handleReset = () => {
        setOptions([]);
        setSearchValue("");
        setShowSearch(false);
    }
  return (
    <div className="flex items-center">
        {!showSearch && (
          <div className="icon-div icon-bg cursor-pointer">
            <SearchOutlined
              className="!text-white !text-lg"
              onClick={() => setShowSearch(true)}
            />
          </div>
        )}

        {showSearch && <Select
            showSearch
            allowClear
            placeholder="Search Workers"
            onSearch={(value) => setSearchValue(value)}
            onSelect={handleSelect}
            filterOption={false} // ensures we use server search
            style={{ width }}
            notFoundContent={loading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : "No results"}
            options={options}
            loading={loading}
            disabled={isPending} 
        />}

        {showSearch && <CloseCircleFilled 
            className="text-white! ml-1 cursor-pointer" 
            onClick={handleReset} 
        />}
    </div>
  );
};

export default WorkerSearch;
