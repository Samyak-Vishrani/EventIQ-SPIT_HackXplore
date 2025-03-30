import React, { useState } from 'react';
import '../styles/posterGen.css';

const PosterGenerator = () => {
  // Initialize state with the exact structure needed by the API
  const [formData, setFormData] = useState({
    theme: {
      name: "",
      description: ""
    },
    style: "modern",
    color_palette: ["#3A86FF", "#FF006E", "#8338EC"],
    elements: ["people", "abstract", "animals"],
    mood: "joyful",
    text_placement: "center",
    additional_notes: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [requestPayload, setRequestPayload] = useState(null);

  const [imageURLS, setImageURLS] = useState([]);

  const styleOptions = [
    { value: "modern", label: "Modern" },
    { value: "retro", label: "Retro" },
    { value: "minimalist", label: "Minimalist" },
    { value: "futuristic", label: "Futuristic" },
    { value: "abstract", label: "Abstract" }
  ];

  const elementOptions = [
    { value: "people", label: "People" },
    { value: "abstract", label: "Abstract Shapes" },
    { value: "animals", label: "Animals" },
    { value: "technology", label: "Technology" },
    { value: "nature", label: "Nature" }
  ];

  const moodOptions = [
    { value: "joyful", label: "Joyful" },
    { value: "exciting", label: "Exciting" },
    { value: "serious", label: "Serious" },
    { value: "dramatic", label: "Dramatic" },
    { value: "mysterious", label: "Mysterious" }
  ];

  const textPlacementOptions = [
    { value: "center", label: "Center" },
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
    { value: "left", label: "Left" },
    { value: "right", label: "Right" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleColorChange = (index, value) => {
    const newColors = [...formData.color_palette];
    newColors[index] = value;
    setFormData({
      ...formData,
      color_palette: newColors
    });
  };

  const handleElementsChange = (value) => {
    let newElements;

    if (formData.elements.includes(value)) {
      // Don't remove if it would make the array empty
      newElements = formData.elements.filter(item => item !== value);
      if (newElements.length === 0) {
        return; // Don't update if it would create an empty array
      }
    } else {
      newElements = [...formData.elements, value];
    }

    setFormData({
      ...formData,
      elements: newElements
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    const payload = {
      theme: {
        name: formData.theme.name.trim(),
        description: formData.theme.description.trim(),
      },
      style: formData.style,
      color_palette: formData.color_palette,
      elements: formData.elements,
      mood: formData.mood,
      text_placement: formData.text_placement,
      additional_notes: formData.additional_notes.trim(),
    };
  
    setRequestPayload(payload);
    console.log("Sending payload:", payload);
  
    try {
      const response = await fetch("https://deepseekers-hackxplore-llm.onrender.com/generate-posters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const responseText = await response.text(); // Read response body
  
      if (!response.ok) {
        let errorMessage = `Error ${response.status}: `;
  
        try {
          const errorData = JSON.parse(responseText);
          errorMessage += errorData.message || errorData.error || "Unknown error";
        } catch (e) {
          errorMessage += responseText || "Unknown error";
        }
  
        throw new Error(errorMessage);
      }
  
      const data = JSON.parse(responseText);
      setResponse(data);
  
      if (data.variations) {
        setImageURLS(data.variations.map((variation) => variation.url));
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="poster-generator">
      <div className="container-1">
        <h1 className="title">AI Poster Generator</h1>
        <p className="subtitle">Create custom event posters in seconds</p>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Theme Information</h2>
            <div className="form-group">
              <label htmlFor="theme.name">Event Name</label>
              <input
                type="text"
                id="theme.name"
                name="theme.name"
                value={formData.theme.name}
                onChange={handleInputChange}
                placeholder="e.g. Trinity Annual Fest"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="theme.description">Event Description</label>
              <textarea
                id="theme.description"
                name="theme.description"
                value={formData.theme.description}
                onChange={handleInputChange}
                placeholder="e.g. Annual technology festival, college fest, tech expo..."
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Design Preferences</h2>
            <div className="form-group">
              <label>Poster Style</label>
              <div className="radio-group">
                {styleOptions.map(option => (
                  <div className="radio-option" key={option.value}>
                    <input
                      type="radio"
                      id={`style-${option.value}`}
                      name="style"
                      value={option.value}
                      checked={formData.style === option.value}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`style-${option.value}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Color Palette</label>
              <div className="color-palette">
                {formData.color_palette.map((color, index) => (
                  <div className="color-input" key={index}>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                    />
                    <span>{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Visual Elements</label>
              <div className="checkbox-group">
                {elementOptions.map(option => (
                  <div className="checkbox-option" key={option.value}>
                    <input
                      type="checkbox"
                      id={`element-${option.value}`}
                      checked={formData.elements.includes(option.value)}
                      onChange={() => handleElementsChange(option.value)}
                    />
                    <label htmlFor={`element-${option.value}`}>{option.label}</label>
                  </div>
                ))}
              </div>
              <small>At least one element must be selected</small>
            </div>

            <div className="form-group">
              <label>Mood</label>
              <div className="radio-group">
                {moodOptions.map(option => (
                  <div className="radio-option" key={option.value}>
                    <input
                      type="radio"
                      id={`mood-${option.value}`}
                      name="mood"
                      value={option.value}
                      checked={formData.mood === option.value}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`mood-${option.value}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Text Placement</label>
              <div className="radio-group">
                {textPlacementOptions.map(option => (
                  <div className="radio-option" key={option.value}>
                    <input
                      type="radio"
                      id={`text_placement-${option.value}`}
                      name="text_placement"
                      value={option.value}
                      checked={formData.text_placement === option.value}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`text_placement-${option.value}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="additional_notes">Additional Notes</label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleInputChange}
                placeholder="e.g. Include AI and robotics elements"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Poster'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {imageURLS.length > 0 && (
          <div className="response-container">
            <h2>Generated Posters</h2>
            {imageURLS.map((url, index) => (
              <img key={index} src={url} alt={`Generated Poster ${index + 1}`} width="300" height="300" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterGenerator;