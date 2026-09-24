import { useEffect } from 'react';

const ElevenLabsWidget = () => {
  useEffect(() => {
    // Inject ElevenLabs ConvAI widget element
    if (!document.querySelector('elevenlabs-convai')) {
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_4401kpn73yzzfjjr8pg03cvr322w');
      document.body.appendChild(widget);
    }

    // Load ElevenLabs ConvAI script
    if (!document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default ElevenLabsWidget;
