import useWindowStore from "@/src/store/window";

interface WindowsControlsProps {
  target: string;
}

export default function WindowsControls({ target }: WindowsControlsProps) {
  const { closeWindow, windows } = useWindowStore();

  return (
    <div className="flex gap-2">
      <div
        className="size-3.5 rounded-full bg-[#ff6157] cursor-pointer"
        onClick={() => closeWindow(target as keyof typeof windows)}
      />
      <div className="size-3.5 rounded-full bg-[#ffc030]" />
      <div className="size-3.5 rounded-full bg-[#2acb42]" />
    </div>
  );
}
