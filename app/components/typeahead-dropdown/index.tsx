import { useState, useEffect } from 'react';

import companyService from '@/app/services/companyService';

export default function TypeaheadDropdown({ value, callback }: { value: number, callback: Function }) {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState<Company[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<Company[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchData = async () => {
        try {
            const response = await companyService.getCompanies();
            const data = await response.data;
            setOptions(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredOptions(
            options.filter((option) =>
                option.scrip.toLowerCase().startsWith(query.toLowerCase())
            )
        );
    }, [query, options]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setQuery(e.target.value);
        setShowDropdown(true);
    }

    const handleOptionClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: number, scrip: string) => {
        setQuery(scrip);
        callback({ target: { name: "companyId", value: id } });
        setShowDropdown(false);
    };

    // Handle input keydown
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowDropdown(false);
        }
    };

    return (
        <div className="relative w-64">
            <input
                type="text"
                name="companyId"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search scrip"
                value={query}
                onChange={(e) => handleOnChange(e)}
                onKeyDown={handleKeyDown}
                onFocus={() => query && setShowDropdown(true)}
            />
            {showDropdown && filteredOptions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={(e) => handleOptionClick(e, option.id, option.scrip)}
                        >
                            {option.scrip}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
