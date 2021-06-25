const SiteData = {
    'S1': '全场A',
    'S2': '全场B',
    'H1': '半场1',
    'H2': '半场2',
    'H3': '半场3',
    'H4': '半场4',
    'H5': '半场5',
    'H6': '半场6',
    'H7': '半场7',
    'H8': '半场8'
};

export function siteNameByKey(key) {
    return SiteData[key];
}