"use client";
import { useState, ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";

type Props = {
    title: string;
    children: ReactNode;
};

export default function AccordionSection({ title, children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border rounded mb-4 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
            >
                <span className="font-semibold text-left">{title}</span>
                <IconChevronDown
                    className={clsx("w-5 h-5 transition-transform", open && "rotate-180")}
                />
            </button>
            {open && <div className="p-4 bg-white">{children}</div>}
        </div>
    );
}
