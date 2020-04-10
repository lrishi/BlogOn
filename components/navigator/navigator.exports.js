var staticExportData = {
    'navigation': null
};

export const setGlobalNavigationContext = ( navigation ) => {
    staticExportData.navigation = navigation;
};

export const getGlobalNavigationContext = () => ( staticExportData.navigation );