# Community Track

Community Track is a mobile application that incentivizes and verifies community service activities. It allows users to post proof of good deeds, which are then automatically verified using AI and expert validation from partnered NGOs. Upon verification, users earn tokens, which can be used to purchase online courses and resources, and badges, which they can proudly display on their LinkedIn profiles to bolster their community service credentials for college applications and goodwill.
This platform not only rewards users but also helps NGOs gain greater visibility and connect with students, fostering a collaborative environment for social good.

### Figma app mockup 

<img width="914" alt="communityService" src="https://github.com/user-attachments/assets/2abcbb47-8032-4fbc-a958-c9559fe1a8e4">

## Features

- **Deed Posting**: Users can post descriptions and images of their community service activities.
- **AI-Powered Verification**: Utilizes Gemini AI for initial verification of posted deeds.
- **Expert Validation**: Partnered NGOs provide additional verification for posted activities.
- **Token Rewards**: Users earn tokens for verified good deeds.
- **Badge System**: Users receive badges based on their contribution level and frequency.
- **Reward Marketplace**: Tokens can be redeemed for online courses and resources.
- **LinkedIn Integration**: Earned badges can be attached to LinkedIn profiles for college applications and professional networking.
- **NGO Connections**: Facilitates connections between users and partnered NGOs.

## Technology Stack

- **Frontend**: React Native
- **Backend**: Flask (Python)
- **Database**: MongoDB
- **AI Integration**: Google's Generative AI (Gemini)
- **State Management**: Context API (React)

## Project Structure

- `src/`: Contains the React Native application source code
  - `screens/`: Individual screen components
  - `context/`: React Context for state management
- `backend/`: Flask server and AI integration
- `Navigation.js`: App navigation configuration
- `App.js`: Main application component

## Key Components

1. **HomeScreen**: Displays user posts and community activity.
2. **VerificationScreen**: Shows the status of submitted deeds for verification.
3. **NewPostScreen**: Allows users to create new posts for good deeds.
4. **RewardsScreen**: Marketplace for redeeming tokens.
5. **UserProfileScreen**: Displays user information, badges, and token balance.

## Backend Services

- `/verify_deed`: Endpoint for deed verification using AI and expert validation.
- `/rewards`: Endpoints for managing and retrieving reward information.

## Environment Variables

- `GOOGLE_API_KEY`: API key for Google's Generative AI
- `MONGO_URI`: MongoDB connection string


