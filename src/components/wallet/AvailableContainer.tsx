"use client";
import { Icon } from "@iconify/react";
import { App, Button, Card, Col, Row, Select } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "@/styles/workers.css";
import AvailableJobCard from "./cards/AvailableJobCard";
import { useRouter } from "next/navigation";
import { FilterOutlined } from "@ant-design/icons";
import { getAllJobs } from "@/redux/action/jobs";
import { createErrorMessage } from "../../../utils/errorInstance";
import { jobs } from "../../../utils/interface";
import FilterCard from "./cards/FilterCard";
import axios from "axios";

interface props {
  isJobs?: boolean;
}
const Option = Select.Option;

const AvailableContainer = ({ isJobs }: props) => {
  const router = useRouter();
  const { modal } = App.useApp();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [allJobs, setAllJobs] = useState<jobs[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [ totalJobs, setTotalJobs ] = useState(0);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: !isJobs ? 3 : 10,
    search: "",
    serviceTypeIds: [] as number[],
    maxPrice: undefined as number | undefined,
    minPrice: undefined as number | undefined,
    availability: undefined as boolean | undefined,
    rating: undefined as number | undefined,
  });

  /** ✅ Core function to get jobs */
  const handleGetJobs = useCallback(
    async (isLoadMore = false) => {
      // prevent duplicate fetches
      if (loading) return;

      setLoading(true);
      try {
        const queryParams: Record<string, number[]|number|string|boolean> = {};

        // Only send valid values
        Object.entries(filters).forEach(([key, value]) => {
          if (
            value !== undefined &&
            value !== "" &&
            !(Array.isArray(value) && value.length === 0)
          ) {
            queryParams[key] = value;
          }
        });

        const res = await getAllJobs(
          queryParams.pageNumber as number,
          queryParams.pageSize as number,
          queryParams.search as string
        );

        if (res.status === 200 || res.status === 201) {
          const newList = res.data.data?.list || [];

          // ✅ Append for load more, otherwise replace
          const totalList =  isLoadMore ? [...allJobs, ...newList] : newList;
          setTotalJobs(res.data.data?.totalItems || 0);
          setAllJobs((prev) =>
            isLoadMore ? [...prev, ...newList] : newList
          );

          if(totalList.length === res.data.data?.totalItems || totalList.length > res.data.data?.totalItems) {
            setHasMore(false);
          }else setHasMore(totalList.length < res.data.data?.totalItems);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          modal.error({
            title: "Unable to get Jobs",
            content: err.response
              ? createErrorMessage(err.response.data)
              : err.message,
          });
        } else if (err instanceof Error) {
          modal.error({
            title: "Unable to get jobs",
            content: err.message,
          });
        } else {
          modal.error({
            title: "Unable to get jobs",
            content: "Something went wrong.",
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [modal, loading, filters, allJobs] 
  );

  /** ✅ Initial load */
  useEffect(() => {
    handleGetJobs(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  /** ✅ Load more when pageNumber changes */
  useEffect(() => {
    if (filters.pageNumber > 1 && totalJobs > allJobs.length) {
      handleGetJobs(true);
    }
  }, [filters.pageNumber, handleGetJobs, totalJobs, allJobs.length]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading && isJobs) {
          setFilters((prev) => ({
            ...prev,
            pageNumber: prev.pageNumber + 1, // ✅ increment page safely
          }));
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, isJobs]);

  return (
    <Row>
      <Col
        lg={isJobs ? 10 : 0}
        sm={24}
        xs={24}
        className="h-[58vh] overflow-y-auto"
      >
        <FilterCard filter={filters} setFilter={setFilters} />
      </Col>

      <Col
        lg={isJobs ? 14 : 24}
        sm={24}
        xs={24}
        className={`${isJobs && "h-[58vh] overflow-y-auto"}`}
      >
        <Card
          title={
            <div className="flex flex-col pt-5 text-[#343434]">
              <h1 className="t-pri flex gap-2 items-center !font-semibold text-lg">
                Available Jobs
              </h1>
              <p className="t-pri mb-6 font-normal text-sm">
                Opportunities matching your skills
              </p>
            </div>
          }
          loading={loading && filters.pageNumber === 1}
          extra={
            <>
              {!isJobs && (
                <Button
                  onClick={() => router.push("/dashboard/worker/jobs")}
                  type="default"
                  className="md:!min-w-[129px] !h-[48px] !text-[#3e3e3e] !border-[#A9A9A9]"
                  style={{ borderRadius: 50 }}
                >
                  <Icon
                    icon="material-symbols:service-toolbox-rounded"
                    fontSize={16}
                  />{" "}
                  View All Jobs
                </Button>
              )}

              {isJobs && (
                <Select
                  style={{ borderRadius: 200 }}
                  className="make-round !rounded-[200px] !h-10 !w-[155px]"
                  placeholder="Sort: Latest"
                  prefix={<FilterOutlined className="text-[#3e3e3e]" />}
                >
                  <Option value="Latest Posted">Latest Posted</Option>
                  <Option value="Oldest Posted">Oldest Posted</Option>
                  <Option value="Highest Posted">Highest Posted</Option>
                  <Option value="Lowest Rate">Lowest Rate</Option>
                  <Option value="Top Rated Clients">Top Rated Clients</Option>
                  <Option value="Most Urgent">Most Urgent</Option>
                </Select>
              )}
            </>
          }
          classNames={{ body: "", header: "sticky top-0 z-[1] !bg-white" }}
        >
          <Row gutter={[15, 15]}>
            {allJobs.map((job: jobs, i: number) => (
              <Col lg={24} sm={24} xs={24} key={i}>
                <AvailableJobCard job={job} />
              </Col>
            ))}
          </Row>

          {/* ✅ Status messages */}
          {loading && filters.pageNumber > 1 && (
            <p className="text-center text-gray-400 mt-3">Loading more...</p>
          )}
          {!hasMore && !loading && allJobs.length > 0 && (
            <p className="text-center text-gray-400 mt-3">
              No more jobs available
            </p>
          )}

          {/* ✅ Intersection trigger */}
          <div ref={observerRef} style={{ height: "1px" }} />
        </Card>
      </Col>
    </Row>
  );
};

export default AvailableContainer;
