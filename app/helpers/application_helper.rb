module ApplicationHelper
  def get_controller_path
    return controller_path
  end

  def title(title)
    content_for(:title, "#{title}")
  end

  def meta_description(content)
    content_for(:meta_description, "#{content}")
  end

  def navbar_color(color)
    content_for(:navbar_color, color)
  end

  def is_paghotel
    action_name == 'paghotel'
  end

  def set_html_class(html_class, conditional)
    return html_class.html_safe if conditional
  end

  def navbar_option(option)
    content_for(:navbar_option, option)
  end

  def flash_message
    @flash = flash
    render :partial => 'shared/messages', :flash => @flash
  end

   def flash_type(name)
    name == 'notice' ? 'success' : 'danger'
  end

  def is_external_pms
    action_name == 'channels' or action_name == 'engine'
  end
end
