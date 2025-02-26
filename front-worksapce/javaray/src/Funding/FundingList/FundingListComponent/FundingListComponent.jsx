import { GoodsContent, GoodsContent1, GoodsContent2, GoodsContent3, GoodsDiv, GoodsImg, PostItem } from "../FundingLists.styles";

const FundingListComponent = ({boards, getRemainDate}) => {
    return(
        <>
            {boards.length > 0 ? (
                boards.map((board) => (
                    <PostItem key={board.boardNo}>
                        <GoodsDiv>
                        <GoodsImg src={board.fundingFileList[0].fileUrl} />
                        <GoodsContent>
                            {board.currentSalePercent ? board.currentSalePercent : 0}%
                            달성
                        </GoodsContent>
                        <GoodsContent1>{board.boardTitle}</GoodsContent1>
                        <GoodsContent1>
                            <GoodsContent2>{board.companyName}</GoodsContent2>
                            <GoodsContent3>
                            {getRemainDate(board.endDate)}
                            </GoodsContent3>
                        </GoodsContent1>
                        </GoodsDiv>
                    </PostItem>
                    ))
                ) : (
                    <p>펀딩 게시물이 존재하지 않습니다.</p>
            )}
        </>
    )
}
export default FundingListComponent;