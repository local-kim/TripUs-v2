package org.project.tripus.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("authority")
@Data
public class AuthorityDto {

    private String id;
    private String authority_name;
}
