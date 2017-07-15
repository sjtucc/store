package com.cc.mapper;

import com.cc.pojo.BaseoilIndex;
import com.cc.pojo.BaseoilIndexExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BaseoilIndexMapper {
    int countByExample(BaseoilIndexExample example);

    int deleteByExample(BaseoilIndexExample example);

    int deleteByPrimaryKey(String indexId);

    int insert(BaseoilIndex record);

    int insertSelective(BaseoilIndex record);

    List<BaseoilIndex> selectByExample(BaseoilIndexExample example);

    BaseoilIndex selectByPrimaryKey(String indexId);

    int updateByExampleSelective(@Param("record") BaseoilIndex record, @Param("example") BaseoilIndexExample example);

    int updateByExample(@Param("record") BaseoilIndex record, @Param("example") BaseoilIndexExample example);

    int updateByPrimaryKeySelective(BaseoilIndex record);

    int updateByPrimaryKey(BaseoilIndex record);
}