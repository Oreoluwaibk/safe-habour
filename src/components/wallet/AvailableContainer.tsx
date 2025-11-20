// AvailableContainer.tsx
"use client";
import { App, Card, Col, Row } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "@/styles/workers.css";
import AvailableJobCard from "./cards/AvailableJobCard";
import { getAllJobs } from "@/redux/action/jobs";
import { createErrorMessage } from "../../../utils/errorInstance";
import { jobs } from "../../../utils/interface";
import FilterCard from "./cards/FilterCard";
import axios from "axios";
import { useAuthentication } from "@/hooks/useAuthentication";

const AvailableContainer = ({ isJobs }: { isJobs?: boolean }) => {
  const { modal } = App.useApp();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const { authentication } = useAuthentication();

  const [loading, setLoading] = useState(false);
  const [allJobs, setAllJobs] = useState<jobs[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: !isJobs ? 3 : 10,
    search: "",
    serviceTypeIds: [] as number[],
    maxPrice: undefined as number | undefined,
    minPrice: undefined as number | undefined,
    from: "",
    to: "",
    rating: undefined as number | undefined,
    location: ""
  });

  /** 🔥 Fetch jobs with filters */
  const handleGetJobs = useCallback(
    async () => {
      if (loading) return;

      setLoading(true);
      try {
        const params = { ...filters };

        const res = await getAllJobs(
          params.pageNumber,
          params.pageSize,
          params.search,
          params.serviceTypeIds,
          params.minPrice,
          params.maxPrice,
          params.rating,
          params.location,
          params.from,
          params.to
        );

        if (res.status === 200 || res.status === 201) {
          const newList = res.data.data?.list ?? [];
          const totalList = filters.pageNumber > 1 ? [...allJobs, ...newList] : newList;

          setAllJobs(totalList);
          setHasMore(filters.pageNumber < res.data.data?.totalPages);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          modal.error({
            title: "Unable to get jobs",
            content: err.response
              ? createErrorMessage(err.response.data)
              : err.message,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [filters, loading, allJobs]
  );

  useEffect(() => {
    handleGetJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (!observerRef.current || !isJobs) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const t = entries[0];
        if (t.isIntersecting && hasMore && !loading) {
          setFilters(prev => ({
            ...prev,
            pageNumber: prev.pageNumber + 1,
          }));
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, isJobs]);

  return (
    <Row>
      <Col lg={isJobs ? 6 : 0} sm={isJobs ? 24 : 0} xs={isJobs ? 24: 0} className="h-[58vh] overflow-y-auto">
        <FilterCard filter={filters} setFilter={setFilters} />
      </Col>

      <Col lg={isJobs ? 18 : 24} sm={24} xs={24} className={`${isJobs && "h-[58vh] overflow-y-auto"}`}>
        <Card
          loading={loading && filters.pageNumber === 1}
          title="Available Jobs"
          classNames={{ header: "sticky top-0 z-[1] !bg-white" }}
        >
          <Row gutter={[15, 15]}>
            {allJobs.map((job, i) => (
              <Col key={i} lg={24}>
                <AvailableJobCard job={job} verified={authentication?.isVerified || false} />
              </Col>
            ))}
          </Row>

          {/* Loader */}
          {loading && filters.pageNumber > 1 && (
            <p className="text-center text-gray-400 mt-3">Loading more...</p>
          )}
          {!hasMore && (
            <p className="text-center text-gray-400 mt-3">No more jobs available</p>
          )}

          <div ref={observerRef} style={{ height: 1 }} />
        </Card>
      </Col>
    </Row>
  );
};

export default AvailableContainer;
