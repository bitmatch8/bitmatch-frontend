import styled from '@emotion/styled';
import React, { useMemo } from 'react'
import RightIcon from '../Svg/RightIcon';
import LeftIcon from '../Svg/LeftIcon';

const PaginationItem: React.FC<{ page: any; active: boolean; onClick?: any }> = ({
  onClick,
  page,
  active,
}) => {
  return (
    <PaginationItemBox className={active ? 'active' : ''} onClick={onClick}>
      {page}
    </PaginationItemBox>
  )
}

const PaginationIcon: React.FC<{ Icon: any; onClick?: any }> = ({ Icon, onClick }) => {
  return (
    <PaginationIconBox onClick={onClick}>
     <Icon width={32} fill={'#C2C5C8'}/> 
    </PaginationIconBox>
  )
}

const Pagination: React.FC<{ page: number; total: number; onChange?: any; pageSize?: number }> = ({
  page,
  total,
  onChange,
  pageSize = 10,
}) => {

  const totalPage = useMemo(() => {
    const totalPage = Math.ceil(total / pageSize)
    return totalPage
  }, [total, pageSize])

  const listArr = useMemo(()=>{
    const groupCount = 4
    const currentPage = page
    const halfCount = Math.floor(groupCount/2)
    const _startPage =  (currentPage > halfCount && totalPage > groupCount) ? currentPage - halfCount : 1
    const startPage = _startPage+groupCount > totalPage && totalPage >groupCount ? totalPage-groupCount : _startPage
    const _endPage = startPage+groupCount
    const endPage = _endPage < totalPage ? _endPage:totalPage
    const arr = []

    // console.log({startPage,endPage,})
    if(totalPage <= 1){
      return []
    }

    if(startPage >=3){
      arr.push(1)
      startPage >= 3 && arr.push('...')
    }

    for (let i = startPage; i <= endPage; i++) {
      arr.push(i)
    }

    if(totalPage - endPage >=1){
      totalPage - endPage >=2 && arr.push('...')
      arr.push(totalPage)
    }

    return arr
  }, [total, page, totalPage])

  return (
    <PaginationBox>
      {listArr.length > 1 && page > 1 ? (
        <PaginationIcon onClick={() => onChange(page - 1)} Icon={RightIcon} />
      ) : (
        ''
      )}
      <PaginationConBox>
        {listArr.map((i, k) => (
          <PaginationItem onClick={() => (i === '...' ? '' : onChange(i))} key={k} page={i} active={i === page} />
        ))}
      </PaginationConBox>
      {listArr.length > 1 && page < totalPage ? (
        <PaginationIcon onClick={() => onChange(page + 1)} Icon={LeftIcon} />
      ) : (
        ''
      )}
    </PaginationBox>
  )
}

const PaginationConBox = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 36px;
  border-radius: 20px;
`
const PaginationItemBox = styled.div`
  user-select: none;
  margin: 0 2px;
  min-width: 80px;
  height: 80px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: #C2C5C8;

font-size: 24px;
font-weight: 600;
line-height: 24px;
  cursor: pointer;
  &.active {
    background: #F7931A;
    color: #fff;
  }
`
const PaginationIconBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.78;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`
const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 80%; */
  margin: 0 auto;
  /* transform: skew(-10deg,0); */
`
export default Pagination
