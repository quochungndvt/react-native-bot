using ReactNative;
using ReactNative.Modules.Core;
using Cl.Json.RNShare;
using ReactNative.Shell;
using System.Collections.Generic;

namespace ReactNativeBot
{
    class MainPage : ReactPage
    {
        public override string MainComponentName
        {
            get
            {
                return "ReactNativeBot";
            }
        }

#if BUNDLE
        public override string JavaScriptBundleFile
        {
            get
            {
                return "ms-appx:///ReactAssets/index.windows.bundle";
            }
        }
#endif

        public override List<IReactPackage> Packages
        {
            get
            {
                return new List<IReactPackage>
                {
                    new MainReactPackage(),
                    new RNSharePackage(),
                };
            }
        }

        public override bool UseDeveloperSupport
        {
            get
            {
#if !BUNDLE || DEBUG
                return true;
#else
                return false;
#endif
            }
        }
    }

}
