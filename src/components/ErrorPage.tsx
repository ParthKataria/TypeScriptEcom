import React from "react";
import { ErrorPageProps } from "./definations";
const ErrorPage = ({ message }: ErrorPageProps) => {
  return <div>Something is wrong.{message}</div>;
};
export default ErrorPage;
