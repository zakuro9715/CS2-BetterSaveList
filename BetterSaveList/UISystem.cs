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
using Colossal.UI.Binding;
using Game.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BetterSaveList
{
    public partial class UISystem : UISystemBase
    {

        protected override void OnCreate()
        {
            base.OnCreate();

            AddUpdateBinding(new GetterValueBinding<bool>(Mod.ID, "enabled", () => Mod.Setting.Enabled));

            AddUpdateBinding(new GetterValueBinding<int>(Mod.ID, "saveListOrdering", () => Mod.Setting.SaveListOrdering));
            AddUpdateBinding(new GetterValueBinding<string>(Mod.ID, "selectedCityName", () => Mod.Setting.SelectedCityName));
            AddBinding(new TriggerBinding<string>(Mod.ID, "setSelectedCityName", (string name) =>
            {
                Mod.Setting.SelectedCityName = name;
                Mod.Setting.ApplyAndSave();
            }));


            AddUpdateBinding(new GetterValueBinding<int>(Mod.ID, "cityListOrdering", () => Mod.Setting.CityListOrdering));
            AddBinding(new TriggerBinding<int>(Mod.ID, "setCityListOrdering", (int i) =>
            {
                Mod.Setting.CityListOrdering = i;
                Mod.Setting.ApplyAndSave();
            }));
            AddUpdateBinding(new GetterValueBinding<bool>(Mod.ID, "isCityListOrderingDesc", () => Mod.Setting.IsCityListOrderingDesc));
            AddBinding(new TriggerBinding<bool>(Mod.ID, "setIsCityListOrderingDesc", (bool desc) =>
            {
                Mod.Setting.IsCityListOrderingDesc = desc;
                Mod.Setting.ApplyAndSave();
            }));


            AddUpdateBinding(new GetterValueBinding<int>(Mod.ID, "saveListOrdering", () => Mod.Setting.SaveListOrdering));
            AddBinding(new TriggerBinding<int>(Mod.ID, "setSaveListOrdering", (int i) =>
            {
                Mod.Setting.SaveListOrdering = i;
                Mod.Setting.ApplyAndSave();
            }));
            AddUpdateBinding(new GetterValueBinding<bool>(Mod.ID, "isSaveListOrderingDesc", () => Mod.Setting.IsSaveListOrderingDesc));
            AddBinding(new TriggerBinding<bool>(Mod.ID, "setIsSaveListOrderingDesc", (bool desc) =>
            {
                Mod.Setting.IsSaveListOrderingDesc = desc;
                Mod.Setting.ApplyAndSave();
            }));
        }

        protected override void OnUpdate()
        {
            base.OnUpdate();
        }
    }
}
