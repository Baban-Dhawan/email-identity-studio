import { SignatureData } from "@/types";

export const renderSignatureHtml = (data: SignatureData): string => {
  const baseStyle = `
    font-family: ${getFontFamily(data.template)};
    color: #333333;
    line-height: 1.4;
  `;

  const nameStyle = `
    font-size: 16px;
    font-weight: bold;
    color: ${data.color};
    margin: 0;
  `;

  const titleStyle = `
    font-size: 14px;
    margin: 0;
    color: #666666;
  `;

  const companyStyle = `
    font-size: 14px;
    font-weight: bold;
    margin: 0;
  `;

  const contactStyle = `
    font-size: 12px;
    color: #666666;
    margin: 5px 0;
  `;

  const socialIconStyle = `
    width: 18px;
    height: 18px;
    margin: 0 4px;
    vertical-align: middle;
  `;

  const dividerStyle = `
    border-top: 1px solid #eaeaea;
    margin: 10px 0;
  `;

  // Base HTML structure
  let html = `<div style="${baseStyle}">\n`;
  
  // Name and title
  html += `  <p style="${nameStyle}">${data.name}</p>\n`;
  
  if (data.title) {
    html += `  <p style="${titleStyle}">${data.title}`;
    if (data.company) html += ` at ${data.company}`;
    html += `</p>\n`;
  } else if (data.company) {
    html += `  <p style="${companyStyle}">${data.company}</p>\n`;
  }

  // Divider
  html += `  <div style="${dividerStyle}"></div>\n`;
  
  // Contact info
  html += `  <p style="${contactStyle}">\n`;
  
  if (data.phone) {
    html += `    Phone: ${data.phone}<br>\n`;
  }
  
  if (data.email) {
    html += `    Email: <a href="mailto:${data.email}" style="color: ${data.color};">${data.email}</a><br>\n`;
  }
  
  if (data.website) {
    html += `    Website: <a href="https://${data.website}" target="_blank" style="color: ${data.color};">${data.website}</a><br>\n`;
  }
  
  if (data.address) {
    html += `    ${data.address}\n`;
  }
  
  html += `  </p>\n`;
  
  // Social media links
  const hasSocials = data.linkedin || data.twitter || data.instagram || data.facebook;
  
  if (hasSocials) {
    html += `  <div>\n`;
    
    if (data.linkedin) {
      html += `    <a href="https://linkedin.com/in/${data.linkedin}" target="_blank" style="text-decoration: none;">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/linkedin.svg" alt="LinkedIn" style="${socialIconStyle}">
      </a>\n`;
    }
    
    if (data.twitter) {
      html += `    <a href="https://twitter.com/${data.twitter}" target="_blank" style="text-decoration: none;">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/twitter.svg" alt="Twitter" style="${socialIconStyle}">
      </a>\n`;
    }
    
    if (data.instagram) {
      html += `    <a href="https://instagram.com/${data.instagram}" target="_blank" style="text-decoration: none;">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/instagram.svg" alt="Instagram" style="${socialIconStyle}">
      </a>\n`;
    }
    
    if (data.facebook) {
      html += `    <a href="https://facebook.com/${data.facebook}" target="_blank" style="text-decoration: none;">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/facebook.svg" alt="Facebook" style="${socialIconStyle}">
      </a>\n`;
    }
    
    html += `  </div>\n`;
  }
  
  html += `</div>`;

  return html;
};

export const getFontFamily = (template: string): string => {
  switch (template) {
    case 'professional':
      return "'Georgia', serif";
    case 'modern':
      return "'Helvetica', Arial, sans-serif";
    case 'creative':
      return "'Comic Sans MS', cursive";
    case 'minimalist':
      return "'Arial', sans-serif";
    case 'classic':
      return "'Times New Roman', serif";
    default:
      return "'Arial', sans-serif";
  }
};

export const copyToClipboard = async (text: string): Promise<void> => {
  // Create a temporary element to hold the HTML structure
  const container = document.createElement("div");
  container.innerHTML = text;
  
  try {
    // Use the ClipboardItem API for rich content copying if supported
    if (navigator.clipboard && window.ClipboardItem) {
      const blob = new Blob([container.innerHTML], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];
      await navigator.clipboard.write(data);
    } else {
      // Fallback to the standard clipboard API
      await navigator.clipboard.writeText(text);
    }
  } catch (err) {
    console.error("Failed to copy:", err);
    // Last resort fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error("Fallback copy failed:", err);
      throw err;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};
