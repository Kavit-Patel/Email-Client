import { useState, useEffect } from "react";
import { EmailItem, EmailListResponse } from "@/types/types";

export const useEmailStorage = (
  fetchedEmailsData: EmailListResponse | null,
  page: number,
  emailsPerPage: number
) => {
  const [emailsListData, setEmailsListData] = useState<EmailListResponse>(
    () => {
      const storedEmailsData = localStorage.getItem("emailsData");
      return storedEmailsData
        ? JSON.parse(storedEmailsData)
        : { list: [], ...fetchedEmailsData };
    }
  );

  useEffect(() => {
    if (fetchedEmailsData) {
      const storedEmailsData = localStorage.getItem("emailsData");
      const existingEmailsData: EmailListResponse = storedEmailsData
        ? JSON.parse(storedEmailsData)
        : { list: [] };

      const mergedEmails = fetchedEmailsData.list.map((email) => {
        const existingEmail = existingEmailsData.list.find(
          (storedEmail) => storedEmail.id === email.id
        );
        return existingEmail ? { ...email, ...existingEmail } : email;
      });

      const mergedEmailsData: EmailListResponse = {
        ...fetchedEmailsData,
        list: [
          ...existingEmailsData.list.filter(
            (email) =>
              !fetchedEmailsData.list.some(
                (newEmail) => newEmail.id === email.id
              )
          ),
          ...mergedEmails,
        ],
      };

      setEmailsListData(mergedEmailsData);
      localStorage.setItem("emailsData", JSON.stringify(mergedEmailsData));
    }
  }, [fetchedEmailsData]);

  const getCurrentPageEmails = () => {
    const startIndex = (page - 1) * emailsPerPage;
    const endIndex = startIndex + emailsPerPage;
    return {
      ...emailsListData,
      list: emailsListData.list.slice(startIndex, endIndex),
    };
  };

  const updateEmailStatus = (id: string, updates: Partial<EmailItem>) => {
    setEmailsListData((prevEmails) => {
      const updatedList = prevEmails.list.map((email) =>
        email.id === id ? { ...email, ...updates } : email
      );

      const updatedEmailsData = { ...prevEmails, list: updatedList };
      localStorage.setItem("emailsData", JSON.stringify(updatedEmailsData));

      return updatedEmailsData;
    });
  };

  return {
    emailsListDataInitial: getCurrentPageEmails(),
    updateEmailStatus,
    emailsListDataWithStatus: emailsListData,
  };
};
