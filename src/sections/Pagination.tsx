import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";

const Pagination = () => {
  const { isLoading, user } = useAuth();
  const { totalTasks, isLoadingTask, currentPage, setCurrentPage, getTasks } =
    useTasks();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalTasks / 5));
  }, [totalTasks]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={handlePreviousPage}
        className="px-2 py-1 rounded hover:opacity-70 bg-primary text-white 
                disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isLoading || isLoadingTask || currentPage === 1}
      >
        &lt;
      </button>
      <span className="text-sm">{currentPage}</span>
      <button
        onClick={handleNextPage}
        className="px-2 py-1 rounded hover:opacity-70 bg-primary text-white 
                disabled:cursor-not-allowed disabled:opacity-50"
        disabled={
          isLoading ||
          isLoadingTask ||
          currentPage === totalPages ||
          totalTasks === 0
        }
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
