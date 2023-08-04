import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkTokenValidity } from '../../store/reducers/user';
import { useAppDispatch } from '../../hooks/redux';
import LatestBuild from '../../components/LatestBuilds';
import Footer from '../../components/Footer/Footer';
import './styles.scss';

function HomePage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkTokenValidity());
  }, [dispatch]);

  return (
    <main className="main-homepage">
      <div className="goToBuilder-container">
        <div className="goToBuilder-container-content">
          <h2 className="goToBuilder-container-content-h2 h2">
            Create your own loadout
          </h2>
          <p className="goToBuilder-container-content-p">
            Create and optimize your own Monster Hunter armor set. Customize
            your loadout with the best armor pieces, skills, and weapons to
            maximize your hunting potential. Whether you&apos;re a seasoned hunter or
            just starting your journey, our builder allows you to tailor your
            loadout to fit your playstyle and tackle the toughest challenges
            that await you in the game.
          </p>
          <Link to="/builder" className="goToBuilder-container-content-btn btn">
            Go to Builder
          </Link>
        </div>
      </div>

      <div className="community-container">
        <div className="community-container-left">
          <div className="community-container-left-goToCommunity">
            <div className="community-container-left-goToCommunity-content">
              <h2 className="community-container-left-goToCommunity-content-h2 h2">
                Community&apos;s Build
              </h2>
              <p className="community-container-left-goToCommunity-content-p p">
                Explore the loadouts created by the community to discover the
                best optimizations proposed by fellow players. Gain insights,
                inspiration, and strategies from experienced hunters to enhance
                your gameplay and achieve new heights in your Monster Hunter
                adventures.
              </p>
              <p className="p">
                <Link
                  to="/loadouts"
                  className="community-container-left-goToCommunity-content-btn btn"
                >
                  Go to Community&apos;s Build
                </Link>
              </p>
            </div>
          </div>
          <div className="community-container-left-goToDiscord">
            <div className="community-container-left-goToDiscord-content">
              <h2 className="community-container-left-goToDiscord-content-h2 h2">
                {' '}
                Join our discord
              </h2>
              <p className="community-container-left-goToDiscord-content-p p">
                Looking for players to team up with in Monster Hunter? Join our
                Discord server and connect with fellow hunters. Find teammates,
                discuss strategies, and embark on exciting hunts together.
              </p>
              <iframe
                title="discord"
                src="https://discord.com/widget?id=1110701136249356378&theme=dark"
                className="community-container-left-goToDiscord-content-api"
              />
            </div>
          </div>
        </div>

        <div className="community-container-right">
          <div className="community-container-right-content">
            <h2 className="community-container-right-content-h2 h2">
              Latest Build
            </h2>
            <div className="community-container-right-content-list-container">
              <LatestBuild />
            </div>
          </div>
        </div>
      </div>

      <div className="lastestUpdate-container">
        <div className="lastestUpdate-container-content">
          <h2 className="lastestUpdate-container-content-h2 h2">
            V1.0.0
          </h2>
          <p className="lastestUpdate-container-content-p p">
            Welcome to Monster Hunter Builder, your ultimate tool for optimizing
            your armor sets in the world of Monster Hunter! Whether you&apos;re a
            seasoned hunter or just starting your journey, our platform offers a
            range of powerful features to help you create the perfect loadout
            and enhance your hunting experience.
          </p>
          <h3 className="lastestUpdate-container-content-h3 h3">Features:</h3>
          <h4 className="lastestUpdate-container-content-h4 h4">Custom Loadout Creation:</h4>
          <ul className="lastestUpdate-container-content-list">
            <li className="lastestUpdate-container-content-list-feature p">
              Build your own personalized armor set tailored to your playstyle
              and preferences.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Select from a vast collection of armor pieces, skills, weapons,
              and elements to maximize your hunting potential.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Experiment with different combinations and fine-tune your loadout
              to suit the toughest challenges that await you in the game.
            </li>
          </ul>
          <h4 className="lastestUpdate-container-content-h4 h4">Skill Analysis and Optimization:</h4>
          <ul className="lastestUpdate-container-content-list">
            <li className="lastestUpdate-container-content-list-feature p">
              Explore the extensive skill database to understand the effects and
              benefits of each skill.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Optimize your loadout by selecting skills that synergize well with
              your chosen armor pieces and weapon type.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Gain valuable insights into the best skill combinations for
              different hunting scenarios and monster encounters.
            </li>
          </ul>
          <h4 className="lastestUpdate-container-content-h4 h4">Community Loadouts:</h4>
          <ul className="lastestUpdate-container-content-list">
            <li className="lastestUpdate-container-content-list-feature p">
              Discover and explore loadouts shared by the vibrant Monster Hunter
              community.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Get inspired by the creative and effective loadouts crafted by
              fellow hunters.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Share your own successful loadouts and contribute to the
              community&apos;s knowledge and strategies.
            </li>
          </ul>
          <h4 className="lastestUpdate-container-content-h4 h4">In-depth Armor and Weapon Information:</h4>
          <ul className="lastestUpdate-container-content-list">
            <li className="lastestUpdate-container-content-list-feature p">
              Access comprehensive details about each armor piece and weapon,
              including stats, rarity, sharpness, elements, and more.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Stay up-to-date with the latest additions and updates to the
              Monster Hunter universe.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Make informed decisions and choose the best gear for your hunting
              adventures.
            </li>
          </ul>
          <h4 className="lastestUpdate-container-content-h4 h4">Integration with Discord Community:</h4>
          <ul className="lastestUpdate-container-content-list">
            <li className="lastestUpdate-container-content-list-feature p">
              Connect with other Monster Hunter enthusiasts through our
              integrated Discord community.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Join discussions, share tips and strategies, and find fellow
              hunters to team up with.
            </li>
            <li className="lastestUpdate-container-content-list-feature p">
              Forge new friendships and embark on epic hunting quests together.
            </li>
          </ul>
          <h3 className="lastestUpdate-container-content-h3 h3">Conclusion:</h3>
          <p className="lastestUpdate-container-content-p p">
            Monster Hunter Builder is your go-to platform for creating,
            optimizing, and sharing your ultimate armor sets in Monster Hunter.
            Unlock the full potential of your hunter and embark on thrilling
            adventures with confidence. Start building your perfect loadout
            today and join a vibrant community of hunters on the quest for
            glory!
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default HomePage;
