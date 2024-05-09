export default interface AlerProps {
  dataTestId: string;
  message: string;
  type: "ERROR" | "SUCCESS";
  onClose?: () => void;
}
