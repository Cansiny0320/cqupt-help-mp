import React, { useState } from "react";
import { View, Image, Input } from "@tarojs/components";
import PrimaryButton from "@/common/components/primary-button";
import icon from "@/static/images/account-icon.png";
import error from "@/static/images/error.png";
import apply from "@/static/images/apply.png";
import { useContainer } from "unstated-next";
import { useMutation } from "react-query/dist/react-query.production.min";
import { resolvePage, navTo } from "@/common/helpers/utils";
import PopupContext from "@/stores/popup";
import { applyIdCard } from "../../services";
import styles from "./index.module.scss";

const Apply = () => {
  const [name, setName] = useState();
  const Popup = useContainer(PopupContext);
  const [mutateApply] = useMutation(applyIdCard);

  const InputChange = (e) => {
    setName(e.detail.value);
  };

  const handleClick = async () => {
    try {
      const res = await mutateApply({ associationName: name });
      if (res.status === 10000) {
        const hide = Popup.show({
          img: apply,
          detail: "信息已上传，请耐心等待审核",
        });
        setTimeout(() => {
          hide();
          setName();
          navTo({ url: resolvePage("id", "index") });
        }, 3000);
      } else {
        const hide = Popup.show({
          title: "申请失败",
          detail: "请稍后再试",
        });
        setTimeout(() => hide(), 3000);
      }
    } catch (e) {
      const hide = Popup.show({
        img: error,
        title: "申请失败",
        detail: "网络错误",
      });
      setTimeout(() => hide(), 3000);
    }
  };

  return (
    <View className={styles.wrap}>
      <View className={styles.top}>
        <View className={styles.title}>申请新会员</View>
        <View className={styles.tips}>要保证社团名称信息的准确性哦</View>
      </View>
      <View>
        <View className={styles.mid}>
          <View className={styles.iconWrap}>
            <Image src={icon} className={styles.icon} />
            <View>社团名称</View>
          </View>
          <Input
            className={styles.input}
            value={name}
            onInput={InputChange}
            placeholder="请输入社团全称"
          />
        </View>
      </View>
      <PrimaryButton
        className={name ? styles.buttonPush : styles.button}
        disabled={!name}
        onClick={handleClick}
      >
        完成
      </PrimaryButton>
      <Popup.Comp />
    </View>
  );
};

export default Apply;
