import type { Filters } from "@/types/filters";

interface FiltersProps {
    filters: Filters;
    onToggle: (key: keyof Filters) => void;
}

export default function Filters({ filters, onToggle }: FiltersProps) {
    return (
        <aside className="mb-6 lg:mb-0 lg:mr-8 w-full lg:w-1/4">
            <div className="bg-gray-100 p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-dark mb-5">Filtres</h2>
                <ul className="space-y-3">
                    <li>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.cotonBio}
                                onChange={() => onToggle("cotonBio")}
                                className="form-checkbox text-primary w-5 h-5 rounded"
                            />
                            <span className="text-sm text-gray-800">Coton bio</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.editionLimitee}
                                onChange={() => onToggle("editionLimitee")}
                                className="form-checkbox text-primary w-5 h-5 rounded"
                            />
                            <span className="text-sm text-gray-800">Édition limitée</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.moinsDe30}
                                onChange={() => onToggle("moinsDe30")}
                                className="form-checkbox text-primary w-5 h-5 rounded"
                            />
                            <span className="text-sm text-gray-800">Moins de 30€</span>
                        </label>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
