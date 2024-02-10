import { useAppDispatch, useAppSelector } from "@/store/hooks";

function ErrorNotification() {
  const errorData = useAppSelector((state) => state.uiSlice);

  return (
    <>
      {errorData.statusCode != null && (
        <div className="w-fit ml-48 ">
          <p className="text-red-600  text-center">{errorData.message}</p>
        </div>
      )}
    </>
  );
}
export default ErrorNotification;
