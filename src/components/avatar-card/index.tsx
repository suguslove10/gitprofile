import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
}

/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
}): React.JSX.Element => {
  return (
    <div className="card shadow-lg card-sm bg-base-100 floating">
      <div className="grid place-items-center py-8">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-8 rounded-full w-32 h-32 ${avatarRing
                ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                : ''
                }`}
            >
              {
                <LazyImage
                  src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                  alt={profile.name}
                  placeholder={skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                />
              }
            </div>
          </div>
        )}
        <div className="text-center mx-auto px-8">
          {loading || !profile ? (
            skeleton({ widthCls: 'w-24', heightCls: 'h-6', className: 'mx-auto mb-2' })
          ) : (
            <div className="badge badge-success badge-outline gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              Available for Work
            </div>
          )}
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {profile.name}
              </span>
            )}
          </h5>
          <div className="mt-2 text-primary font-bold text-sm">
            {loading || !profile ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' }) : 'Cloud Engineer & DevOps Specialist'}
          </div>
          <div className="mt-3 text-base-content opacity-70 text-sm italic">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>

          <div className="mt-6 flex flex-col gap-2 items-center text-sm opacity-60">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-40', heightCls: 'h-10' })
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">📍</span> {profile.location || 'Bangalore, India'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">✉️</span> sugugalag@gmail.com
                </div>
              </>
            )}
          </div>
        </div>
        {resumeFileUrl &&
          (loading ? (
            <div className="mt-6">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-primary btn-sm text-xs mt-6 px-6"
              download
              rel="noreferrer"
            >
              Download Resume
            </a>
          ))}
      </div>
    </div>
  );
};

export default AvatarCard;
