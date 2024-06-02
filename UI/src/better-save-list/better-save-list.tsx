import {
    SaveItem,
    saveItemClasses,
    saveListClasses,
    SaveListHeader,
    useUniformSizeProvider,
    VirtualList,
    FullWidthDigits, Icon, LocalizedTimestamp
} from '../modules'
import mod from 'mod.json'
import { bindValue, trigger, useValue } from 'cs2/api'
import { useCssLength } from 'cs2/utils';
import { Component, memo, useMemo, useState } from 'react';
import styles from './better-save-list.module.scss'

interface SaveInfo {
    id: string
    cityName: string
    displayName: string
    population: number
    lastModified: string
}

interface CityInfo {
    id: string
    cityName: string
    displayName: string
    population: number
    lastModified: string
}
type CityInfoDict = { [key: string]: CityInfo }


const saveList$ = bindValue<SaveInfo[]>("menu", "saves")

const enabled$ = bindValue<boolean>(mod.id, "enabled")

const selectedCityName$ = bindValue<string>(mod.id, "selectedCityName", "")
const setSelectedCityName = (name: string) => trigger(mod.id, "setSelectedCityName", name)

const cityListOrdering$ = bindValue<number>(mod.id, "cityListOrdering")
const setCityListOrdering = (i: number) => trigger(mod.id, "setCityListOrdering", i)
const isCityListOrderingDesc$ = bindValue<boolean>(mod.id, "isCityListOrderingDesc")
const setCityListOrderingDesc = (desc: boolean) => trigger(mod.id, "setCityListOrderingDesc", desc)

const saveListOrdering$ = bindValue<number>(mod.id, "saveListOrdering")
const setSaveListOrdering = (i: number) => trigger(mod.id, "setSaveListOrdering", i)
const isSaveListOrderingDesc$ = bindValue<boolean>(mod.id, "isSaveListOrderingDesc")
const setSaveListOrderingDesc = (desc: boolean) => trigger(mod.id, "setSaveListOrderingDesc", desc)

const getTime = (date: string) => new Date(date).getTime()

export const BetterSaveList = (Component: any) => (props: any) => {
    const enabled = useValue(enabled$)
    if (!enabled) {
        const { children, ...otherProps } = props || {};
        return <Component {...otherProps}>{children}</Component>
    }

    const { onSelectSave, selectedSave } = props

    const saveList = useValue(saveList$)
    const selectedCityName = useValue(selectedCityName$)

    const saveListOrdering = useValue(saveListOrdering$)
    const isSaveListOrderingDesc = useValue(isSaveListOrderingDesc$)
    const reverseSaveListOrdering = () => setSaveListOrderingDesc(!isSaveListOrderingDesc)

    const cityListOrdering = useValue(cityListOrdering$)
    const isCityListOrderingDesc = useValue(isCityListOrderingDesc$)
    const reverseCityListOrdering = () => setCityListOrderingDesc(!isCityListOrderingDesc)
    const ordering = (i: number, desc: boolean) => (a: SaveInfo | CityInfo, b: SaveInfo | CityInfo) => 
        (() => {
            switch (i) {
                case 0:
                    // name
                    return a.displayName <= b.displayName ? -1 : 1;
                case 1:
                    // lastModified
                    return getTime(a.lastModified) - getTime(b.lastModified)
                case 2:
                    // population
                    return a.population - b.population

            }
            throw new Error()
        })() * (desc ? -1 : 1)
    
    let citySaveList = useMemo(() =>
        (selectedCityName == "" ? saveList : saveList.filter((s) => s.cityName == selectedCityName)),
        [selectedCityName, saveList]
    )
        .sort(ordering(saveListOrdering, isSaveListOrderingDesc))
    const cityInfo = useMemo(() => {
        const cityInfo: CityInfoDict = {}
        for (let save of saveList) {
            if (cityInfo[save.cityName] == undefined) {
                cityInfo[save.cityName] = { ...save, displayName: save.cityName }
            } else {
                const city = cityInfo[save.cityName]
                if (save.population > city.population) { city.population = save.population }
                if (getTime(save.lastModified) > getTime(city.lastModified)) { city.lastModified = save.lastModified }
            }
        }
        return cityInfo
    }, [saveList])
    let cityList = useMemo(() =>
        [...new Set(saveList.map((s) => s.cityName))].sort().map((name) => cityInfo[name]).sort(ordering(cityListOrdering, isCityListOrderingDesc)),
        [saveList, cityListOrdering, isCityListOrderingDesc],
    )

    const renderSaveItem = (save: SaveInfo) => {
        return <SaveItem save={save} selected={selectedSave == save.id} onClick={() => onSelectSave(save.id)} />
    }
    const saveItemSizeProvider = useUniformSizeProvider(useCssLength(saveListClasses.itemHeight), citySaveList.length, 3)

    const renderCityItem = (city: CityInfo) => {
        const selected = selectedCityName == city.cityName
        return (
            <button
                className={`${saveItemClasses.item} ${selected ? 'selected' : ''}`}
                style={{paddingLeft: 0} }
                onClick={() => setSelectedCityName(city.cityName)}
            >
                <div className={saveItemClasses.title}>
                    <div className={saveItemClasses.titleInner}>{city.cityName}</div>

                </div>
                        <div className={saveItemClasses.population} >
                            {city.population}
                        </div>
                        <Icon tinted src="Media/Game/Icons/Citizen.svg" className={saveItemClasses['population-icon']} />
                    <FullWidthDigits><LocalizedTimestamp value={city.lastModified} /></FullWidthDigits>
            </button>
        )
    }
    const saveGroupSizeProvider = useUniformSizeProvider(useCssLength(saveListClasses.itemHeight), cityList.length, 3);

    return (
        <div className={`${saveListClasses['save-list']}`}>
            <div style={{ "height": "100%", "width": "100%", "display": "flex", "flexDirection": "row" }}>
                <div style={{ "height": "100%", "width": "40%" }}>
                    <SaveListHeader
                        className={styles['city-list-header']}
                        onSelectOrdering={
                            (i: number) => i == cityListOrdering ? reverseCityListOrdering() : setCityListOrdering(i)
                        }
                        selectedOrdering={cityListOrdering}
                    />
                    <VirtualList className={saveListClasses.scrollable} renderItem={(i: number) => renderCityItem(cityList[i])} sizeProvider={saveGroupSizeProvider} />
                </div>
                <div style={{ "height": "100%", "flex": "1" }}>
                    <SaveListHeader
                        onSelectOrdering={
                            (i: number) => i == saveListOrdering ? reverseSaveListOrdering() : setSaveListOrdering(i)
                        }
                        selectedOrdering={saveListOrdering}
                    />
                    <VirtualList className={saveListClasses.scrollable} renderItem={(i: number) => renderSaveItem(citySaveList[i])} sizeProvider={saveItemSizeProvider} />
                </div>
            </div>
        </div>
    )
}
