export async function loadTemplate(templateName, data = {}) {
  try {
    const res = await fetch('./js/html/' + templateName + '.html');
    if (!res.ok) throw new Error('Failed to load template ' + templateName);
    const htmlString = await res.text();
    
    // Evaluate template literal with provided data
    const keys = Object.keys(data);
    const values = Object.values(data);
    const renderFunc = new Function(...keys, 'return `' + htmlString + '`;');
    return renderFunc(...values);
  } catch (err) {
    console.error('Template loading error:', err);
    return '<div style="color:red; text-align:center; padding: 20px;">Error loading template: ' + templateName + '</div>';
  }
}
