/* Copyright 2024 zakuro <z@kuro.red> (https://x.com/zakuro9715)
 * 
 * This file is part of BetterSaveList.
 * 
 * BetterSaveList is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 * 
 * BetterSaveList is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * BetterSaveList. If not, see <https://www.gnu.org/licenses/>.
 */
using System.Collections.Generic;
using Colossal.IO.AssetDatabase;
using Colossal.Logging;
using Game;
using Game.Modding;
using Game.SceneFlow;
using LibShared.Localization;

namespace BetterSaveList
{
    public class Mod : IMod
    {
        public static ILog log = LogManager.GetLogger($"{nameof(BetterSaveList)}.{nameof(Mod)}").SetShowsErrorsInUI(false);
        public static Setting Setting;
        public const string ID = "BetterSaveList";

        public void OnLoad(UpdateSystem updateSystem)
        {
            log.Info(nameof(OnLoad));

            if (GameManager.instance.modManager.TryGetExecutableAsset(this, out var asset))
                log.Info($"Current mod asset at {asset.path}");

            Setting = new Setting(this);
            Setting.RegisterInOptionsUI();
            AssetDatabase.global.LoadSettings(nameof(BetterSaveList), Setting, new Setting(this));

            var localizationManager = GameManager.instance.localizationManager;
            localizationManager.activeDictionary.TryGetValue("Common.ENABLE", out var label);
            var locales = new Dictionary<string, string> {
                { Setting.GetSettingsLocaleID(), ID },
                { Setting.GetOptionLabelLocaleID("Enabled"), label }
            };
            GameManager.instance.localizationManager.AddSource("en-US", new LocaleDictionarySource("en-US", locales));


            updateSystem.UpdateAt<UISystem>(SystemUpdatePhase.UIUpdate);
        }

        public void OnDispose()
        {
            log.Info(nameof(OnDispose));
            if (Setting != null)
            {
                Setting.UnregisterInOptionsUI();
                Setting = null;
            }
        }
    }
}
