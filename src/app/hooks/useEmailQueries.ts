import { EmailBodyResponse, EmailItem, EmailListResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

const errorMessage = (err: AxiosError | Error | unknown) => {
  if (err instanceof AxiosError && err.response) {
    return err.response.data.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something went wrong !";
};

export const useEmails = (page: number) => {
  return useQuery(["emails", page], async (): Promise<EmailListResponse> => {
    const limit = 10;
    try {
      return await axios
        .get(
          `${process.env.NEXT_PUBLIC_EMAIL_LIST}/?page=${page}&limit=${limit}`
        )
        .then((res) => {
          return {
            ...res.data,
            list: res.data.list.map((item: EmailItem) => ({
              ...item,
              isRead: false,
              isFavorite: false,
            })),
          };
        });
    } catch (error) {
      return errorMessage(error);
    }
  });
};

export const useEmailDetail = (id: string) => {
  return useQuery(["email", id], async (): Promise<EmailBodyResponse> => {
    if (!id) {
      throw new Error("Provide id !");
    }
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_EMAIL_LIST}/?id=${id}`
      );
      return data;
    } catch (error) {
      return errorMessage(error);
    }
  });
};
