import React from "react";
import { View } from "@tarojs/components";
import NavBack from "@/common/components/nav-back";
import Placeholder from "@/common/components/placeholder";
import { resolvePage, navTo } from "@/common/helpers/utils";
import { now, gapDay } from "@/common/helpers/date";
import { useQuery } from "react-query/dist/react-query.production.min";
import Empty from "@/common/components/empty";
import { navigateBack, redirectTo } from "@tarojs/taro";
import { getVolunteerActivityListInfo, checkIsVolunteer } from "../../services";
import styles from "./index.module.scss";

const PAGE_TITLE = "志愿报名";

const Volunteer = () => {
  const { data: isVolunteerRes } = useQuery(
    "checkIsVolunteer",
    checkIsVolunteer,
    {
      cacheTime: 0,
    }
  );
  const { data: list, isLoading, isError } = useQuery(
    "getVolunteerActivityListInfo",
    getVolunteerActivityListInfo
  );
  if (!isVolunteerRes) {
    return <Placeholder title={PAGE_TITLE} />;
  }
  if (isVolunteerRes.status === 10000) {
    if (!isVolunteerRes.exist) {
      redirectTo({ url: resolvePage("volunteer", "bind") });
    }
  }

  if (isLoading) return <Placeholder title={PAGE_TITLE} />;
  if (isError || !list) return <Placeholder title={PAGE_TITLE} isError />;
  if (list.data.length === 0)
    return (
      <Empty
        title={PAGE_TITLE}
        detail="志愿活动空空如也哦～"
        suggestion="去看看活动吧"
        btnContent="查看活动"
        onBtnClick={() => navigateBack()}
      />
    );
  return (
    <View className={styles.wrapper}>
      <NavBack title={PAGE_TITLE} background="#F6F6F9" />
      {list.data
        .sort((a, b) => b.last_date - a.last_date)
        .map((item) => (
          <View
            className={styles.card}
            key={item.id}
            onClick={() =>
              navTo({
                url: `${resolvePage("volunteer", "detail")}?id=${item.id}`,
              })
            }
          >
            <View className={styles.cardTop}>
              <View className={styles.cardName}>{item.name}</View>
              <View
                className={
                  item.last_date < now() ? styles.cardTimeGray : styles.cardTime
                }
              >
                {item.last_date < now()
                  ? "报名已结束"
                  : `距报名结束:${gapDay(item.last_date)}天`}
              </View>
            </View>
            <View className={styles.cardInfo}>
              活动简介：
              {item.description}
            </View>
          </View>
        ))}
    </View>
  );
};

export default Volunteer;
