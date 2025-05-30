import React from 'react';
import Button from './components/buttons/Button';
import Input from './components/forms/Input';
import Card, { CardHeader, CardBody, CardFooter } from './components/cards/Card';
import Spinner from './components/loaders/Spinner';
import Text from './components/typography/Text';
import Heading from './components/typography/Heading';
import VintageIcon from './components/icons/VintageIcon';

function App() {
  return (
    <div className="min-h-screen bg-cream-lightest p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <Heading level={1} vintage={true} className="text-center mb-2">
          ThrowbackTee
        </Heading>
        <Text variant="lead" className="text-center mb-8">
          Vintage shirts with timeless style
        </Text>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <section className="mb-12">
          <Heading level={2} className="mb-6">
            Design System Components
          </Heading>
          
          {/* Typography Section */}
          <Card className="mb-8">
            <CardHeader>
              <Heading level={3}>Typography</Heading>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
                <Heading level={4}>Heading 4</Heading>
                <Heading level={5}>Heading 5</Heading>
                <Heading level={6}>Heading 6</Heading>
                
                <div className="pt-4">
                  <Heading level={3} vintage={true}>Vintage Heading</Heading>
                  <Text variant="body">Regular body text</Text>
                  <Text variant="lead">Lead paragraph text</Text>
                  <Text variant="small">Small text</Text>
                  <Text variant="vintage">Vintage typewriter text</Text>
                  <Text variant="display">Display text</Text>
                  <Text variant="caption">Caption text</Text>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Buttons Section */}
          <Card className="mb-8">
            <CardHeader>
              <Heading level={3}>Buttons</Heading>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="vintage">Vintage Button</Button>
                  <Button variant="link">Link Button</Button>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="vintage">
                    <VintageIcon name="shopping-bag" size={18} className="mr-2" />
                    With Icon
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Forms Section */}
          <Card className="mb-8">
            <CardHeader>
              <Heading level={3}>Form Inputs</Heading>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Standard Input" 
                  id="standard-input" 
                  placeholder="Enter text here"
                />
                
                <Input 
                  label="Vintage Input" 
                  id="vintage-input" 
                  placeholder="Typewriter style..."
                  vintage={true}
                />
                
                <Input 
                  label="Required Input" 
                  id="required-input" 
                  placeholder="This field is required"
                  required={true}
                />
                
                <Input 
                  label="Error Input" 
                  id="error-input" 
                  placeholder="With error message"
                  error="This field has an error"
                />
                
                <Input 
                  label="Disabled Input" 
                  id="disabled-input" 
                  placeholder="Cannot be edited"
                  disabled={true}
                />
                
                <Input 
                  label="Password Input" 
                  id="password-input" 
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </CardBody>
          </Card>
          
          {/* Cards Section */}
          <Card className="mb-8">
            <CardHeader>
              <Heading level={3}>Cards</Heading>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="normal">
                  <CardHeader>
                    <Heading level={5}>Normal Card</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>This is a standard card with a clean design.</Text>
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary" size="sm">Action</Button>
                  </CardFooter>
                </Card>
                
                <Card variant="vintage">
                  <CardHeader>
                    <Heading level={5} vintage={true}>Vintage Card</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text variant="vintage">This card has a vintage aesthetic with special borders and background.</Text>
                  </CardBody>
                  <CardFooter>
                    <Button variant="vintage" size="sm">Action</Button>
                  </CardFooter>
                </Card>
                
                <Card variant="flat">
                  <CardHeader>
                    <Heading level={5}>Flat Card</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>A simpler card with minimal styling.</Text>
                  </CardBody>
                  <CardFooter>
                    <Button variant="secondary" size="sm">Action</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardBody>
          </Card>
          
          {/* Icons Section */}
          <Card className="mb-8">
            <CardHeader>
              <Heading level={3}>Icons</Heading>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  'shopping-bag', 'tag', 'shirt', 'menu', 'search', 'home',
                  'check', 'x', 'chevron-down', 'user', 'heart', 'stamp',
                  'typewriter', 'camera'
                ].map(iconName => (
                  <div key={iconName} className="flex flex-col items-center justify-center p-4 border border-gray-light rounded-md">
                    <VintageIcon name={iconName} size={24} className="text-brown-dark mb-2" />
                    <Text variant="small" className="text-center">{iconName}</Text>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          
          {/* Loaders Section */}
          <Card className="mb-8">
            <CardHeader>
              <Heading level={3}>Loading Spinners</Heading>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-8 justify-center">
                <div className="flex flex-col items-center">
                  <Spinner size="sm" />
                  <Text variant="small" className="mt-2">Small</Text>
                </div>
                <div className="flex flex-col items-center">
                  <Spinner size="md" />
                  <Text variant="small" className="mt-2">Medium</Text>
                </div>
                <div className="flex flex-col items-center">
                  <Spinner size="lg" />
                  <Text variant="small" className="mt-2">Large</Text>
                </div>
                <div className="flex flex-col items-center">
                  <Spinner size="xl" color="orange" />
                  <Text variant="small" className="mt-2">Orange</Text>
                </div>
                <div className="flex flex-col items-center">
                  <Spinner size="lg" color="blue" />
                  <Text variant="small" className="mt-2">Blue</Text>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>
      </main>
      
      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-light text-center">
        <Text variant="vintage">
          ThrowbackTee © {new Date().getFullYear()} - Vintage Style, Modern Comfort
        </Text>
      </footer>
    </div>
  );
}

export default App;