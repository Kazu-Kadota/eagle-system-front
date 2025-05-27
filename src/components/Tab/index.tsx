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
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="no-scrollbar relative flex flex-col overflow-x-auto px-2 sm:flex-row sm:gap-4">
        {items.map((item) => (
          <button
            key={item.key}
            className={`flex items-center justify-center gap-3 rounded-[3px] px-6 py-3 text-dark outline-none transition-colors hover:bg-light-gray max-sm:flex-1 lg:min-w-[15rem] ${item.key === selectedKey ? 'bg-light-gray' : ''}`}
            onClick={() => setSelectedKey(item.key)}
          >
            {item.renderIcon({ className: 'w-7 sm:w-8 lg:w-9' })}
            <span className="text-base/tight font-bold tracking-wider sm:text-lg lg:text-xl">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mx-2 border-b border-line-light" />

      {selectedItem && (
        <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-2 py-4">
          {selectedItem.renderContent()}
        </div>
      )}
    </div>
  );
}
