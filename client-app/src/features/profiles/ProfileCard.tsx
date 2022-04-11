import React from 'react';
import { Card, Image, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProfile } from '../../app/models/profile';
import { useTranslation } from 'react-i18next';

interface IProps{
    profile: IProfile
}
const ProfileCard: React.FC<IProps> = ({profile}) => {
  const { t } = useTranslation(["social"]);

  return (
    <Card as={Link} to={`/profile/${profile.username}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.displayName || 'display name'}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
          {profile.followersCount} {t("Followers")}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
