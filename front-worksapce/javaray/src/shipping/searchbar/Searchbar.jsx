import { SearchBtn, SearchCover, SearchInput, SearchInputCover, SearchSelect, SearchInnerCover, SearchMainCover} from "./SearchbarCss"

const SearchBar = () => {
    return(
        <SearchCover>
            <SearchMainCover>
                <SearchInnerCover>
                    <SearchSelect>
                        <option value="1">지역별</option>
                        <option value="2">어종별</option>
                    </SearchSelect>
                </SearchInnerCover>
                <SearchInputCover>
                    <SearchInput/>
                </SearchInputCover>
                <SearchInnerCover>
                    <SearchBtn>검색하기</SearchBtn>
                </SearchInnerCover>
            </SearchMainCover>
        </SearchCover>
    )
}

export default SearchBar;