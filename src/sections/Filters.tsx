import React, { useEffect, useState } from "react";
import { Completed } from "../types";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import Pagination from "./Pagination";

const Filters= () => {
  const { user } = useAuth();
  const { currentPage, setCurrentPage, getTasks, setCompletedFilter, completedFilter } = useTasks();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompletedFilter(event.target.value as Completed);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (user?.id) {
      let completed: boolean | undefined;

      switch (completedFilter) {
        case Completed.YES:
          completed = true;
          break;
        case Completed.NO:
          completed = false;
          break;
        case Completed.ALL:
          completed = undefined;
          break;
        default:
          completed = undefined;
          break;
      }
      getTasks(currentPage, completed);
    }
  }, [user?.id, currentPage, completedFilter]);

  return (
    <div className="mb-6 p-4 border border-border-light rounded-md bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="">
          <label htmlFor="completed" className="text-sm text-text-dark">
            Completada:
          </label>
          <select
            onChange={(e) => handleFilterChange(e)}
            value={completedFilter}
            id="completed"
            name="completed"
            className="ml-2 p-2 border rounded text-sm"
          >
            <option value={Completed.ALL}>Todas</option>
            <option value={Completed.YES}>Sí</option>
            <option value={Completed.NO}>No</option>
          </select>
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default Filters;
