interface TabNavProps {
  activeTab: 'overview' | 'actions' | 'avaldata';
  onChange: (tab: 'overview' | 'actions' | 'avaldata') => void;
}

export function TabNav({ activeTab, onChange }: TabNavProps) {
  return (
    <div className="tab-nav">
      <button
        className={activeTab === 'overview' ? 'tab-nav__item tab-nav__item--active' : 'tab-nav__item'}
        onClick={() => onChange('overview')}
      >
        Monthly Overview
      </button>
      <button
        className={activeTab === 'actions' ? 'tab-nav__item tab-nav__item--active' : 'tab-nav__item'}
        onClick={() => onChange('actions')}
      >
        Impairments & Actions
      </button>
      <button
        className={activeTab === 'avaldata' ? 'tab-nav__item tab-nav__item--active' : 'tab-nav__item'}
        onClick={() => onChange('avaldata')}
      >
        Available Data Points
      </button>
    </div>
  );
}
