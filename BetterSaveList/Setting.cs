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
using Colossal.IO.AssetDatabase;
using Game.Modding;
using Game.Settings;

namespace BetterSaveList
{
    [FileLocation(nameof(BetterSaveList))]
    public class Setting : ModSetting
    {
        public Setting(IMod mod) : base(mod)
        {
            SetDefaults();
        }
        public override void SetDefaults()
        {
            Enabled = true;
            SelectedCityName = "";
            CityListOrdering = 0;
            IsCityListOrderingDesc = false;
            SaveListOrdering = 0;
            IsSaveListOrderingDesc = false;
        }

        public bool Enabled { get; set; }

        [SettingsUIHidden]
        public string SelectedCityName { get; set; }

        [SettingsUIHidden]
        public int CityListOrdering { get; set; }
        [SettingsUIHidden]
        public bool IsCityListOrderingDesc { get; set; }

        [SettingsUIHidden]
        public int SaveListOrdering { get; set; }
        [SettingsUIHidden]
        public bool IsSaveListOrderingDesc { get; set; }
    }
}
