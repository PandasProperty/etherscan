export default interface AlerProps {
  message: string;
  type: 'ERROR' | 'SUCCESS';
  onClose?: () => void;
}
