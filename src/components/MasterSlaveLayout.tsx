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

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);

  const filteredEmails = useMemo(() => {
    return emailsListDataWithStatus?.list?.filter((email: EmailItem) => {
      if (filter === "Unread") return !email.isRead;
      if (filter === "Read") return email.isRead;
      if (filter === "Favorite") return email.isFavorite;
      return true;
    });
  }, [emailsListDataWithStatus, filter]);

  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleEmailClick = (email: EmailItem) => {
    updateEmailStatus(email.id, { isRead: true });
    setSelectedEmail(email);
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 border p-2 bg-[#f4f5f9]">
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
        <section className="md:h-[calc(100vh-150px)]">
          <header className="flex flex-col text-[#636363]">
            <div className="flex px-6 py-6 text-lg items-center font-semibold">
              <span className="mr-4">Filter By:</span>
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

            <section className="flex px-4">
              <aside
                className={`md:h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar ${
                  selectedEmail ? "w-1/3" : "w-full"
                }`}
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
              </aside>

              {selectedEmail && (
                <article className="h-fit md:h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar w-2/3 p-4">
                  <EmailDetail
                    email={selectedEmail}
                    updateEmailStatus={updateEmailStatus}
                  />
                </article>
              )}
            </section>
          </header>
        </section>
      )}

      <footer className="flex justify-center gap-0.5">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        {pageNumbers?.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 ${
              pageNum === page
                ? "bg-gray-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </footer>
    </main>
  );
}
