var staticExportData = {
    'navigation': null,
    'stackNavigation': null,
};

export const setGlobalNavigationContext = ( navigation ) => {
    staticExportData.navigation = navigation;
};
export const getGlobalNavigationContext = () => ( staticExportData.navigation );



export const setGlobalStackNavigationContext = ( navigation ) => {
    staticExportData.stackNavigation = navigation;
};

export const getGlobalStackNavigationContext = () => ( staticExportData.stackNavigation );