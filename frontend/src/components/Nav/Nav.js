import React from 'react';
import styles from './Nav.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';

export default function Nav() {
  const history = useHistory();

  const [atextvalue, setAtextvalue] = React.useState('메세지');
  const [isShownChat, setIsShownChat] = React.useState(false);
  const [isShownLib, setIsShownLib] = React.useState(false);
  const [isShownName, setIsShownName] = React.useState(false);
  const [isShownSearch, setIsShownSearch] = React.useState(false);

  return (
    <nav className={styles.container}>
      <div className={styles.section}>
        {/* 채팅 아이콘 */}
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownChat(true)}
          onMouseLeave={() => setIsShownChat(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png"></AvatarComp>
          {isShownChat && <div className={styles.textarea}>Chat and Friends List</div>}
        </div>
        {/* 라이브러리 아이콘 */}
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownLib(true)}
          onMouseLeave={() => setIsShownLib(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png"></AvatarComp>
          {isShownLib && <div className={styles.textarea}>Library</div>}
        </div>
        <hr className={styles.divider} />
        {/* Joined 게임 아이콘 */}
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        {/* test */}
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownName(true)}
          onMouseLeave={() => setIsShownName(false)}
        >
          <AvatarComp size="medium" imgPath="/images/nav/chat.png">
            {atextvalue}
          </AvatarComp>
          {isShownName && <div className={styles.textarea}>Game Name</div>}
        </div>
        {/* 검색 아이콘 */}
        <div
          className={styles.item}
          onMouseEnter={() => setIsShownSearch(true)}
          onMouseLeave={() => setIsShownSearch(false)}
        >
          <div className={styles.search}>
            <SearchIcon className={styles.searchIcon} />
            {isShownSearch && <div className={styles.textarea}>Search Game or User</div>}
          </div>
        </div>
      </div>
    </nav>
  );
}
