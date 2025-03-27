.. _machine_learning:

Machine Learning in Finwave
========

.. _auto_tag:

-----------------------
Automatically Identifying Individuals in Historical Data
-----------------------
We recognize that you may have already gone through a lot of work processing your data. One way of doing this has been
to place the IDs of the individuals in an image in the "Caption" field in the IPTC meta-data. We are able to work with this,
with the stipulation that the image contain only one individual and the caption contains only one ID. Then, when we do
fin detection with our AI algorithm, we find that there is one fin, see that there is a caption present with a **known** individual
within the population, and can automatically assign that fin to that ID. If there are multiple individuals or multiple
IDs in the caption, it cannot be reliably which IDs belong to which fins.

This setting can be updated in the :ref:`Population Settings <main_settings>`