import { useMemo, useState } from 'react';

type TabItem = {
  key: string;
  label: string;
  renderIcon: (props: { className: string }) => React.ReactNode;
  renderContent: () => React.ReactNode;
};

type Props = {
  items: TabItem[];
};

export function Tab({ items }: Props) {
  const [selectedKey, setSelectedKey] = useState(() => items.at(0)?.key ?? '');

  const selectedItem = useMemo(
    () => items.find((item) => item.key === selectedKey),
    [selectedKey],
  );

  return (
    <>
      <div className="relative flex gap-4">
        {items.map((item) => (
          <button
            key={item.key}
            className={`flex flex-col items-center justify-center gap-1 rounded-[3px] px-6 py-3 text-dark outline-none transition-colors hover:bg-light-gray max-sm:flex-1 sm:min-w-[15rem] sm:flex-row sm:gap-3 ${item.key === selectedKey ? 'bg-light-gray' : ''}`}
            onClick={() => setSelectedKey(item.key)}
          >
            {item.renderIcon({ className: 'w-7 sm:w-8 lg:w-9' })}
            <span className="text-base font-bold tracking-wider sm:text-lg lg:text-xl">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="-mx-4 border-b border-line-light" />

      {selectedItem && (
        <div className="py-4">{selectedItem.renderContent()}</div>
      )}
    </>
  );
}
