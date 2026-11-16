import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Shared line-icon style: 24px grid, 1.7 stroke, round ends. Product-specific icons use it too. */
export const iconProps = (props) => ({
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...props,
});
export const SearchIcon = (p) => (_jsxs("svg", { ...iconProps(p), children: [_jsx("circle", { cx: "11", cy: "11", r: "6.5" }), _jsx("path", { d: "m20 20-4.2-4.2" })] }));
export const BackIcon = (p) => (_jsx("svg", { ...iconProps(p), children: _jsx("path", { d: "M15 5l-7 7 7 7" }) }));
export const ForwardIcon = (p) => (_jsx("svg", { ...iconProps(p), children: _jsx("path", { d: "M9 5l7 7-7 7" }) }));
export const MoonIcon = (p) => (_jsx("svg", { ...iconProps(p), children: _jsx("path", { d: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" }) }));
export const SunIcon = (p) => (_jsxs("svg", { ...iconProps(p), children: [_jsx("circle", { cx: "12", cy: "12", r: "4" }), _jsx("path", { d: "M12 2.5v2m0 15v2M4.6 4.6l1.4 1.4m12 12 1.4 1.4M2.5 12h2m15 0h2M4.6 19.4 6 18M18 6l1.4-1.4" })] }));
export const UserIcon = (p) => (_jsxs("svg", { ...iconProps(p), children: [_jsx("circle", { cx: "12", cy: "8", r: "4" }), _jsx("path", { d: "M4 21a8 8 0 0 1 16 0" })] }));
export const HomeIcon = (p) => (_jsx("svg", { ...iconProps(p), children: _jsx("path", { d: "M4 11.5 12 5l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4v-5h-5v5h-4A1.5 1.5 0 0 1 4 19z" }) }));
export const PencilIcon = (p) => (_jsx("svg", { ...iconProps(p), children: _jsx("path", { d: "M15.2 5.2l3.6 3.6M4.5 19.5l1-4.4L16 4.6a1.6 1.6 0 0 1 2.3 0l1.1 1.1a1.6 1.6 0 0 1 0 2.3L8.9 18.5z" }) }));
export const AppsIcon = (p) => (_jsxs("svg", { ...iconProps(p), children: [_jsx("circle", { cx: "6.5", cy: "6.5", r: "2" }), _jsx("circle", { cx: "17.5", cy: "6.5", r: "2" }), _jsx("circle", { cx: "6.5", cy: "17.5", r: "2" }), _jsx("circle", { cx: "17.5", cy: "17.5", r: "2" })] }));
