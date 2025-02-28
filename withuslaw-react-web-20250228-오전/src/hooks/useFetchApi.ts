"use client";

import { useRouter } from "next/navigation";
import { authAtom } from "@stores";
import { useAtomValue } from "jotai";

export default function useFetchApi() {
  const authInfo = useAtomValue(authAtom);
  const router = useRouter();

  const fetchApi = ({
    url,
    method,
    body,
  }: {
    url: string;
    method: "get" | "post";
    body?: any;
  }) =>
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authInfo.accessToken}`,
      },
      body: JSON.stringify(body),
    });

  return { fetchApi };
}
