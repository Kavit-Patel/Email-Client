"use client";
import { useEmails } from "@/app/hooks/useEmailQueries";
import { useEffect, useMemo, useState } from "react";
import EmailList from "./EmailList";
import { EmailItem } from "@/types/types";
import EmailDetail from "./EmailDetail";
import { useEmailStorage } from "@/app/hooks/useLocalStorage";
import Loader from "./Loader";

export default function MasterSlaveLayout() {
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const {
    data: ListData,
    isLoading: IsEmailListLoading,
    isError: IsEmailListError,
  } = useEmails(page);

  const totalEmails = ListData?.total || 0;
  const emailsPerPage = 10;
  const totalPages = Math.ceil(totalEmails / emailsPerPage);
  const [pageNumbers, setPageNumbers] = useState<number[] | null>(null);
  const [filter, setFilter] = useState<"Unread" | "Read" | "Favorite" | null>(
    null
  );
  const { emailsListDataInitial, updateEmailStatus, emailsListDataWithStatus } =
    useEmailStorage(ListData ? ListData : null, page, emailsPerPage);

  useEffect(() => {
    if (totalPages) {
      setPageNumbers(Array.from({ length: totalPages }, (_, i) => i + 1));
    }
  }, [totalPages]);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredEmails = useMemo(() => {
    return emailsListDataWithStatus?.list?.filter((email: EmailItem) => {
      if (filter === "Unread") return !email.isRead;
      if (filter === "Read") return email.isRead;
      if (filter === "Favorite") return email.isFavorite;
      return true;
    });
  }, [emailsListDataWithStatus, filter]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleEmailClick = (email: EmailItem) => {
    updateEmailStatus(email.id, { isRead: true });
    setSelectedEmail(email);
  };
  return (
    <div className={`flex min-h-screen flex-col gap-4 border p-2 bg-[#f4f5f9]`}>
      {IsEmailListLoading && (
        <div className="w-full h-[calc(100vh-150px)] flex justify-center items-center">
          <Loader />
        </div>
      )}
      {IsEmailListError && (
        <div className="w-full h-[calc(100vh-150px)] flex justify-center items-center text-red-500 font-semibold">
          Error loading email list
        </div>
      )}
      {!IsEmailListLoading && !IsEmailListError && emailsListDataInitial && (
        <div className="md:h-[calc(100vh-150px)]">
          <div className="flex flex-col text-[#636363]">
            <div className="flex px-6 py-6 text-lg items-center font-semibold">
              <div className="mr-4">Filter By:</div>
              <button
                onClick={() => setFilter("Unread")}
                className={`${
                  filter === "Unread" ? "bg-[#E1E4EA]" : ""
                } px-4 py-1 rounded-3xl`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter("Read")}
                className={`${
                  filter === "Read" ? "bg-[#E1E4EA]" : ""
                } px-4 py-1 rounded-3xl`}
              >
                Read
              </button>
              <button
                onClick={() => setFilter("Favorite")}
                className={`${
                  filter === "Favorite" ? "bg-[#E1E4EA]" : ""
                } px-4 py-1 rounded-3xl`}
              >
                Favorites
              </button>
            </div>

            <div className="flex px-4">
              <div
                className={` md:h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar ${
                  selectedEmail ? "w-1/3" : "w-full"
                } `}
              >
                <EmailList
                  selectedEmail={selectedEmail}
                  setSelectedEmail={handleEmailClick}
                  data={
                    filteredEmails
                      ? { ...ListData, list: filteredEmails }
                      : emailsListDataInitial
                  }
                />
              </div>

              {selectedEmail && (
                <div className="h-fit md:h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar w-2/3 p-4">
                  <EmailDetail
                    email={selectedEmail}
                    updateEmailStatus={updateEmailStatus}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="mr-4 p-2 bg-gray-200 disabled:bg-gray-400"
        >
          Previous
        </button>
        <div className=" flex gap-2 px-4 w-28">
          {pageNumbers?.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-1 rounded ${
                page === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          disabled={page === totalPages}
          onClick={handleNextPage}
          className="p-2 bg-gray-200 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
